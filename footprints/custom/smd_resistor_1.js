function assert(condition, message = "Assertion failed") {
  if (!condition) throw new Error(message);
}
function err(message = "Unknown error occurred") {
  throw new Error(message);
}

module.exports = {
  params: {
    designator: 'SMD Resistor Array',
    side: 'F',
    reversible: false,

    pinout_start: '',
    P0_0 : {type: 'net', value: "P0_0"},
    P0_1 : {type: 'net', value: "P0_1"},
    P0_2 : {type: 'net', value: "P0_2"},
    P0_3 : {type: 'net', value: "P0_3"},
    P0_4 : {type: 'net', value: "P0_4"},
    P0_5 : {type: 'net', value: "P0_5"},
    P0_6 : {type: 'net', value: "P0_6"},
    P0_7 : {type: 'net', value: "P0_7"},
    P1_0 : {type: 'net', value: "P1_0"},
    P1_1 : {type: 'net', value: "P1_1"},
    P1_2 : {type: 'net', value: "P1_2"},
    P1_3 : {type: 'net', value: "P1_3"},
    P1_4 : {type: 'net', value: "P1_4"},
    P1_5 : {type: 'net', value: "P1_5"},
    P1_6 : {type: 'net', value: "P1_6"},
    P1_7 : {type: 'net', value: "P1_7"},
    pinout_end: '',

    side_pins_cnt: 8,
    pin_spacing: 0.5,
    package_width: 1.9,
    package_height: 4,
  },
  body: p => {
    let layer = p.reversible? '*': side;
    let side = p.side;
    let otherside = side == 'F'? 'B': 'F';
    let smd = `
    	(attr smd)
    	(fp_line (start 0.5 -2.12) (end -0.5 -2.12) (stroke (width 0.12) (type solid) ) (layers "${layer}.SilkS") )
    	(fp_line (start 0.5 2.12) (end -0.5 2.12) (stroke (width 0.12) (type solid) ) (layers "${layer}.SilkS") )
    	(fp_line (start -1.55 -2.25) (end -1.55 2.25) (stroke (width 0.05) (type solid) ) (layers "${layer}.CrtYd") )
    	(fp_line (start -1.55 -2.25) (end 1.55 -2.25) (stroke (width 0.05) (type solid) ) (layers "${layer}.CrtYd") )
    	(fp_line (start 1.55 2.25) (end -1.55 2.25) (stroke (width 0.05) (type solid) ) (layers "${layer}.CrtYd") )
    	(fp_line (start 1.55 2.25) (end 1.55 -2.25) (stroke (width 0.05) (type solid) ) (layers "${layer}.CrtYd") )
    	(fp_line (start -0.8 -2) (end -0.8 2) (stroke (width 0.1) (type solid) ) (layers "${layer}.Fab") )
    	(fp_line (start -0.8 2) (end 0.8 2) (stroke (width 0.1) (type solid) ) (layers "${layer}.Fab") )
    	(fp_line (start 0.8 -2) (end -0.8 -2) (stroke (width 0.1) (type solid) ) (layers "${layer}.Fab") )
    	(fp_line (start 0.8 2) (end 0.8 -2) (stroke (width 0.1) (type solid) ) (layers "${layer}.Fab") )
    `;
    	// (fp_circle (center -2.00 2.00) (end -1.97 2.00) (layer F.Fab) (width 0.06))
    	// (fp_circle (center -1.27 2.54) (end -1.14 2.54) (layer Cmts.User) (width 0.25))

    const keys = Object.keys(p);
    const values = Object.values(p);
    const pinout_start_index = keys.indexOf("pinout_start") + 1;
    let total_pin_cnt = keys.indexOf("pinout_end") - keys.indexOf("pinout_start") - 1;
    assert(p.side_pins_cnt >= 1, "There's no 0 pin smd right?");
    assert(total_pin_cnt == 2 * p.side_pins_cnt, "Pin mapping should be 2 * side_pins_cnt");

    const init_pos = (p.pin_spacing / 2) * (p.side_pins_cnt - 1) ;
    let x = p.package_width / 2;
    let y = -init_pos;
    let pad_cnt = 1;
    for(let i = 0; i < 2; i++) {
      for(let c = 0; c < p.side_pins_cnt; c++) {
      	smd += `
      	(pad ${pad_cnt} smd rect (at ${x} ${y}) (size 0.8 0.3) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${values[pinout_start_index + pad_cnt - 1]})`;
      	if (p.reversible) {
        	smd += `
      	(pad ${pad_cnt} smd rect (at ${-x} ${y}) (size 0.8 0.3) (layers ${otherside}.Cu ${otherside}.Paste ${otherside}.Mask) ${values[pinout_start_index + pad_cnt - 1]})`;
        }
      	pad_cnt += 1;
        switch(i) {
          case 0: y += p.pin_spacing; break;
          case 1: y -= p.pin_spacing; break;
          default: err("When did we have more than 4 sides for QFN?");
        }
      }
      switch(i) {
        case 0: x = -p.package_width / 2; y = init_pos; break;
        case 1: x = p.package_width / 2;  y = -init_pos; break;
        default: err("When did we have more than 4 sides for QFN?");
      }
    }

    // (attr exclude_from_pos_files exclude_from_bom)
    const common_top = `
  (footprint "custom:smd_resistor_array"
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
