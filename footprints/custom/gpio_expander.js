function assert(condition, message = "Assertion failed") {
  if (!condition) throw new Error(message);
}
function err(message = "Unknown error occurred") {
  throw new Error(message);
}

// The starting anchor point is assumed to be at bottom left and marches to the right
module.exports = {
  params: {
    designator: 'IO-Expander',
    side: 'F',
    reversible: false,

    pinout_start: '',
    P1_0 : {type: 'net', value: "P1_0"},
    P1_1 : {type: 'net', value: "P1_1"},
    P1_2 : {type: 'net', value: "P1_2"},
    P1_3 : {type: 'net', value: "P1_3"},
    P0_0 : {type: 'net', value: "P0_0"},
    P0_1 : {type: 'net', value: "P0_1"},
    P0_2 : {type: 'net', value: "P0_2"},
    P0_3 : {type: 'net', value: "P0_3"},
    GND : {type: 'net', value: "GND"},
    P0_4 : {type: 'net', value: "P0_4"},
    P0_5 : {type: 'net', value: "P0_5"},
    P0_6 : {type: 'net', value: "P0_6"},
    P0_7 : {type: 'net', value: "P0_7"},
    P1_4 : {type: 'net', value: "P1_4"},
    P1_5 : {type: 'net', value: "P1_5"},
    P1_6 : {type: 'net', value: "P1_6"},
    P1_7 : {type: 'net', value: "P1_7"},
    AD0 : {type: 'net', value: "AD0"},
    SCL : {type: 'net', value: "SCL"},
    SDA : {type: 'net', value: "SDA"},
    VCC : {type: 'net', value: "VCC"},
    INTN : {type: 'net', value: "INTN"},
    RSTN : {type: 'net', value: "RSTN"},
    AD1 : {type: 'net', value: "AD1"},
    pinout_end: '',

    reverse_pinout_start: '',
    _P1_0 : {type: 'net', value: "P1_0"},
    _P1_1 : {type: 'net', value: "P1_1"},
    _P1_2 : {type: 'net', value: "P1_2"},
    _P1_3 : {type: 'net', value: "P1_3"},
    _P0_0 : {type: 'net', value: "P0_0"},
    _P0_1 : {type: 'net', value: "P0_1"},
    _P0_2 : {type: 'net', value: "P0_2"},
    _P0_3 : {type: 'net', value: "P0_3"},
    _GND : {type: 'net', value: "GND"},
    _P0_4 : {type: 'net', value: "P0_4"},
    _P0_5 : {type: 'net', value: "P0_5"},
    _P0_6 : {type: 'net', value: "P0_6"},
    _P0_7 : {type: 'net', value: "P0_7"},
    _P1_4 : {type: 'net', value: "P1_4"},
    _P1_5 : {type: 'net', value: "P1_5"},
    _P1_6 : {type: 'net', value: "P1_6"},
    _P1_7 : {type: 'net', value: "P1_7"},
    _AD0 : {type: 'net', value: "AD0"},
    _SCL : {type: 'net', value: "SCL"},
    _SDA : {type: 'net', value: "SDA"},
    _VCC : {type: 'net', value: "VCC"},
    _INTN : {type: 'net', value: "INTN"},
    _RSTN : {type: 'net', value: "RSTN"},
    _AD1 : {type: 'net', value: "AD1"},
    reverse_pinout_end: '',

    middle_pad : { type: 'net', value: "GND" },

    side_pins_cnt: 6,
    pin_spacing: 0.5,
    package_width: 4,
    middle_pad_width: 2.5,

    package_anchor_circle_radius: 0.03,
    pin_anchor_circle_radius: 0.13,
  },
  body: p => {
    let side = p.side;
    let layer = p.reversible? '*': side;
    let otherside = side == 'F'? 'B': 'F';
    // TODO at's
    let qfn = `
    	(fp_text reference "${p.ref}" (at 0 -6.0) (layer "${side}.SilkS")
    	  ${p.ref_hide}
    		(effects (font (size 1 1) (thickness 0.15)))
    	)
    	(fp_text value VFQFPN-${p.package_width * 4}_L${p.package_width}-W${p.package_width}-P${p.pin_spacing}-BL-EP2.8 (at 0 6.0) (layer "${side}.Fab")
    		(effects (font (size 1 1) (thickness 0.15)))
    	)
    `;

    const keys = Object.keys(p);
    const values = Object.values(p);
    const pinout_start_index = keys.indexOf("pinout_start") + 1;
    const reverse_pinout_start_index = keys.indexOf("reverse_pinout_start") + 1;
    let total_pin_cnt = keys.indexOf("pinout_end") - keys.indexOf("pinout_start") - 1;
    let total_reverse_pin_cnt = keys.indexOf("reverse_pinout_end") - keys.indexOf("reverse_pinout_start") - 1;
    assert(p.side_pins_cnt >= 1, "There's no qfn-0 right?");
    assert(total_pin_cnt == total_reverse_pin_cnt, "Pin mapping should have the same count on the other side right?");
    assert(total_pin_cnt == 4 * p.side_pins_cnt, "Pin mapping should be 4 * side_pins_cnt");

	  const reverse_flip_y = (Math.abs(p.r) > 45 && Math.abs(p.r) < 135) || (Math.abs(p.r - 180 ) > 45 && Math.abs(p.r - 180)  < 135);
    const init_pos = (p.pin_spacing / 2) * (p.side_pins_cnt - 1) ;
    let x = - init_pos;
    let y = p.package_width / 2;
    let horizontal= false;
    let pad_cnt = 1;

    // TODO: make it determined automatically
    qfn += `
    	(fp_line (start 2.15 -1.75) (end 2.15 -2.15) (layer "${side}.SilkS") (width 0.20))
    	(fp_line (start 2.15 -2.15) (end 1.75 -2.15) (layer "${side}.SilkS") (width 0.20))
    	(fp_line (start -2.15 -1.75) (end -2.15 -2.15) (layer "${side}.SilkS") (width 0.20))
    	(fp_line (start -2.15 -2.15) (end -1.75 -2.15) (layer "${side}.SilkS") (width 0.20))
    	(fp_line (start -1.75 2.15) (end -2.15 2.15) (layer "${side}.SilkS") (width 0.20))
    	(fp_line (start -2.15 2.15) (end -2.15 1.75) (layer "${side}.SilkS") (width 0.20))
    	(fp_line (start 2.15 1.75) (end 2.15 2.15) (layer "${side}.SilkS") (width 0.20))
    	(fp_line (start 2.15 2.15) (end 1.75 2.15) (layer "${side}.SilkS") (width 0.20))
    `;
    if (p.reversible) {
      qfn += `
      	(fp_line (start 2.15 -1.75) (end 2.15 -2.15) (layer "${otherside}.SilkS") (width 0.20))
      	(fp_line (start 2.15 -2.15) (end 1.75 -2.15) (layer "${otherside}.SilkS") (width 0.20))
      	(fp_line (start -2.15 -1.75) (end -2.15 -2.15) (layer "${otherside}.SilkS") (width 0.20))
      	(fp_line (start -2.15 -2.15) (end -1.75 -2.15) (layer "${otherside}.SilkS") (width 0.20))
      	(fp_line (start -1.75 2.15) (end -2.15 2.15) (layer "${otherside}.SilkS") (width 0.20))
      	(fp_line (start -2.15 2.15) (end -2.15 1.75) (layer "${otherside}.SilkS") (width 0.20))
      	(fp_line (start 2.15 1.75) (end 2.15 2.15) (layer "${otherside}.SilkS") (width 0.20))
      	(fp_line (start 2.15 2.15) (end 1.75 2.15) (layer "${otherside}.SilkS") (width 0.20))
      `;
    }

    const pad_width = 0.25;
    const pad_length = 0.875;
    for(let i = 0; i < 4; i++) {
      for(let c = 0; c < p.side_pins_cnt; c++) {
      	qfn += `
      	(pad ${pad_cnt} smd rect (at ${x} ${y} ${(horizontal? 90: 180) + p.r}) (size ${pad_width} ${pad_length}) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${values[pinout_start_index + pad_cnt - 1]})`;
      	if (p.reversible) {
        	qfn += `
      	(pad ${pad_cnt} smd rect (at ${reverse_flip_y? x: -x} ${reverse_flip_y? -y: y} ${(horizontal? 90: 180) + p.r}) (size ${pad_width} ${pad_length}) (layers ${otherside}.Cu ${otherside}.Paste ${otherside}.Mask) ${values[reverse_pinout_start_index + pad_cnt - 1]})`;
        }
      	pad_cnt += 1;
        switch(i) {
          case 0: x += p.pin_spacing; break;
          case 1: y -= p.pin_spacing; break;
          case 2: x -= p.pin_spacing; break;
          case 3: y += p.pin_spacing; break;
          default: err("When did we have more than 4 sides for QFN?");
        }
      }
      switch(i) {
        case 0: x = p.package_width / 2;   y = init_pos; break;
        case 1: y = - p.package_width / 2; x = init_pos; break;
        case 2: x = - p.package_width / 2; y = -init_pos; break;
        case 3: y = p.package_width / 2;   x = -init_pos; break; //Useless
        default: err("When did we have more than 4 sides for QFN?");
      }
      horizontal ^= true;
    }

    qfn += `
    	(pad 25 smd rect (at 0.00 0.00 ${90.00 + p.r}) (size ${p.middle_pad_width} ${p.middle_pad_width}) (layers F.Cu F.Paste F.Mask) ${p.middle_pad})
    `; 

    if (p.reversible) {
      	qfn += `
    	(pad 25 smd rect (at 0.00 0.00 ${90.00 + p.r}) (size ${p.middle_pad_width} ${p.middle_pad_width}) (layers ${otherside}.Cu ${otherside}.Paste ${otherside}.Mask) ${p.middle_pad})`;
      
    }

    // triangle
    const max_y = p.package_width / 2
    const max_x = max_y
    const poly_points = [[-2.11, 2.11], [-2.35, 2.44], [-1.87, 2.44]];
    const triangle_points = poly_points.map(p => `(xy ${p[0]} ${p[1]})`).join(' ');
    const triangle_points_reversed = poly_points.map(p => `(xy ${reverse_flip_y? p[0]: -p[0]} ${reverse_flip_y? -p[1]: p[1]})`).join(' ');
    qfn += `
    	(fp_poly (pts ${triangle_points} ) (stroke (width 0.12) (type solid) ) (fill yes) (layer "${side}.SilkS") )
    `;

    if (p.reversible) {
      qfn += `
      	(fp_poly (pts ${triangle_points_reversed} ) (stroke (width 0.12) (type solid) ) (fill yes) (layer "${otherside}.SilkS") )
      `;
    }
    // qfn += `
    // 	(fp_circle (center -${max_y} ${max_y}) (end -${max_y - p.package_anchor_circle_radius} ${max_y}) (layer F.Fab) (width 0.06))
    // 	(fp_circle (center -${init_pos} ${max_y + .54}) (end -${init_pos - p.pin_anchor_circle_radius} ${max_y + .54}) (layer Cmts.User) (width 0.25))
    // `;

    // (attr exclude_from_pos_files exclude_from_bom)
    const common_top = `
  (footprint "custom:qfn"
    (layer "${p.side}.Cu")
    ${p.at}

    (attr smd)
    `;

    return common_top + qfn + `
      )
      `;
  }
}
