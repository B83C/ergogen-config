function assert(condition, message = "Assertion failed") {
  if (!condition) throw new Error(message);
}
function err(message = "Unknown error occurred") {
  throw new Error(message);
}

module.exports = {
  params: {
    designator: 'SMD Footprint',
    side: 'F',
    reversible: false,

    pinout_start: '',
    P0_0 : {type: 'net', value: "P0_0"},
    P1_0 : {type: 'net', value: "P1_0"},
    pinout_end: '',

    add_vias: 0b00,

    side_pins_cnt: 1,
    pin_spacing: 0.5,
    package_width: 1,
  },
  body: p => {
    let side = p.side;
    let layer = p.reversible? '*': side;
    let otherside = side == 'F'? 'B': 'F';
    let smd = `
    	(attr smd)
    `;
    	// (fp_line (start 0.25 -1.18) (end -0.25 -1.18) (stroke (width 0.12) (type solid) ) (layer "${side}.SilkS") )
    	// (fp_line (start 0.25 1.18) (end -0.25 1.18) (stroke (width 0.12) (type solid) ) (layer "${side}.SilkS") )
    	// (fp_line (start -1 -1.25) (end -1 1.25) (stroke (width 0.05) (type solid) ) (layer "${side}.CrtYd") )
    	// (fp_line (start -1 -1.25) (end 1 -1.25) (stroke (width 0.05) (type solid) ) (layer "${side}.CrtYd") )
    	// (fp_line (start 1 1.25) (end -1 1.25) (stroke (width 0.05) (type solid) ) (layer "${side}.CrtYd") )
    	// (fp_line (start 1 1.25) (end 1 -1.25) (stroke (width 0.05) (type solid) ) (layer "${side}.CrtYd") )
    	// (fp_line (start -0.5 -1) (end -0.5 1) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )
    	// (fp_line (start -0.5 1) (end 0.5 1) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )
    	// (fp_line (start 0.5 -1) (end -0.5 -1) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )
    	// (fp_line (start 0.5 1) (end 0.5 -1) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )
    	// (fp_circle (center -2.00 2.00) (end -1.97 2.00) (layer F.Fab) (width 0.06))
    	// (fp_circle (center -1.27 2.54) (end -1.14 2.54) (layer Cmts.User) (width 0.25))

    const keys = Object.keys(p);
    const values = Object.values(p);
    const pinout_start_index = keys.indexOf("pinout_start") + 1;
    let total_pin_cnt = keys.indexOf("pinout_end") - keys.indexOf("pinout_start") - 1;
    assert(p.side_pins_cnt >= 1, "There's no 0 pin smd right?");
    assert(total_pin_cnt == 2 * p.side_pins_cnt, "Pin mapping should be 2 * side_pins_cnt");

    const pad_width = 0.3;
    const pad_length = 0.5;
    const init_pos = (p.pin_spacing / 2) * (p.side_pins_cnt - 1) ;

    const via_outer_diameter = 0.5;
    const via_inner_diameter = 0.3;
    const via_spacing = via_outer_diameter + 0.4;
    const via_init_pos = (via_spacing / 2) * (p.side_pins_cnt - 1) ;

    let x = -p.package_width / 2;
    let y = -init_pos;
    let pad_cnt = 1;

    let via_x = -(p.package_width + via_outer_diameter + via_spacing) / 2;
    let via_y = - via_init_pos;

    for(let i = 0; i < 2; i++) {
      for(let c = 0; c < p.side_pins_cnt; c++) {
      	smd += `
      	(pad ${pad_cnt} smd rect (at ${x} ${y} ${90 + p.r}) (size ${pad_width} ${pad_length}) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${values[pinout_start_index + pad_cnt - 1]})`;
        if ((p.add_vias >> pad_cnt - 1) & 0b1) {
        	smd += `
        	(pad ${pad_cnt} thru_hole circle (at ${via_x} ${via_y} ${90 + p.r}) (size ${via_outer_diameter} ${via_outer_diameter}) (drill ${via_inner_diameter}) (layers ${side}.Cu ) ${values[pinout_start_index + pad_cnt - 1]})`;
        }
      	if (p.reversible) {
        	smd += `
      	(pad ${pad_cnt} smd rect (at ${x} ${y} ${90 + p.r}) (size ${pad_width} ${pad_length}) (layers ${otherside}.Cu ${otherside}.Paste ${otherside}.Mask) ${values[pinout_start_index + pad_cnt - 1]})`;
        }
      	pad_cnt += 1;
        switch(i) {
          case 0: y += p.pin_spacing; via_y += via_spacing; break;
          case 1: y -= p.pin_spacing; via_y -= via_spacing; break;
          default: err("When did we have more than 4 sides for QFN?");
        }
      }
      x = -x;
      switch(i) {
        case 0: y = init_pos;  via_y = via_init_pos;  break;
        case 1: y = -init_pos; via_y = -via_init_pos; break;
        default: err("When did we have more than 4 sides for QFN?");
      }
    }

    // (attr exclude_from_pos_files exclude_from_bom)
    const common_top = `
  (footprint "custom:smd_resistor_array"
  	(layer "F.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -15 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )

    (attr smd)
    `;

    return common_top + smd + `
      )
      `;
  }
}
