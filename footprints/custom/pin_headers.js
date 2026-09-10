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
    reversible: true,

    pinout_start: '',
    P0_0 : {type: 'net', value: "P0_0"},
    P0_1 : {type: 'net', value: "P0_1"},
    P0_2 : {type: 'net', value: "P0_2"},
    P0_3 : {type: 'net', value: "P0_3"},
    P0_4 : {type: 'net', value: "P0_4"},
    P0_5 : {type: 'net', value: "P0_5"},
    pinout_end: '',

    pin_spacing: 2.54,
  },
  body: p => {
    let side = p.side;
    let layer = p.reversible? '*': side;
    let otherside = side == 'F'? 'B': 'F';
    	// (fp_circle (center -2.00 2.00) (end -1.97 2.00) (layer F.Fab) (width 0.06))
    	// (fp_circle (center -1.27 2.54) (end -1.14 2.54) (layer Cmts.User) (width 0.25))

    const keys = Object.keys(p);
    const values = Object.values(p);
    const pinout_start_index = keys.indexOf("pinout_start") + 1;
    let total_pin_cnt = keys.indexOf("pinout_end") - keys.indexOf("pinout_start") - 1;

    const init_pos = (p.pin_spacing / 2) * (total_pin_cnt - 1) ;
    let x = 0;
    let y = -init_pos;
    let pad_cnt = 1;

    let header = `
    	(fp_line (start ${-1.38} ${-init_pos + -1.38}) (end ${0} ${-init_pos + -1.38}) (stroke (width 0.12) (type solid) ) (layer "${side}.SilkS") )
    	(fp_line (start ${-1.38} ${-init_pos + 0}) (end ${-1.38} ${-init_pos + -1.38}) (stroke (width 0.12) (type solid) ) (layer "${side}.SilkS") )
    	(fp_line (start ${-1.38} ${-init_pos + 1.27}) (end ${-1.38} ${-init_pos + 14.08}) (stroke (width 0.12) (type solid) ) (layer "${side}.SilkS") )
    	(fp_line (start ${-1.38} ${-init_pos + 1.27}) (end ${1.38} ${-init_pos + 1.27}) (stroke (width 0.12) (type solid) ) (layer "${side}.SilkS") )
    	(fp_line (start ${-1.38} ${-init_pos + 14.08}) (end ${1.38} ${-init_pos + 14.08}) (stroke (width 0.12) (type solid) ) (layer "${side}.SilkS") )
    	(fp_line (start ${1.38} ${-init_pos + 1.27}) (end ${1.38} ${-init_pos + 14.08}) (stroke (width 0.12) (type solid) ) (layer "${side}.SilkS") )
    	(fp_line (start ${-1.77} ${-init_pos + -1.77}) (end ${-1.77} ${-init_pos + 14.47}) (stroke (width 0.05) (type solid) ) (layer "${side}.CrtYd") )
    	(fp_line (start ${-1.77} ${-init_pos + 14.47}) (end ${1.77} ${-init_pos + 14.47}) (stroke (width 0.05) (type solid) ) (layer "${side}.CrtYd") )
    	(fp_line (start ${1.77} ${-init_pos + -1.77}) (end ${-1.77} ${-init_pos + -1.77}) (stroke (width 0.05) (type solid) ) (layer "${side}.CrtYd") )
    	(fp_line (start ${1.77} ${-init_pos + 14.47}) (end ${1.77} ${-init_pos + -1.77}) (stroke (width 0.05) (type solid) ) (layer "${side}.CrtYd") )
    	(fp_line (start ${-1.27} ${-init_pos + -0.635}) (end ${-0.635} ${-init_pos + -1.27}) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )
    	(fp_line (start ${-1.27} ${-init_pos + 13.97}) (end ${-1.27} ${-init_pos + -0.635}) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )
    	(fp_line (start ${-0.635} ${-init_pos + -1.27}) (end ${1.27} ${-init_pos + -1.27}) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )
    	(fp_line (start ${1.27} ${-init_pos + -1.27}) (end ${1.27} ${-init_pos + 13.97}) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )
    	(fp_line (start ${1.27} ${-init_pos + 13.97}) (end ${-1.27} ${-init_pos + 13.97}) (stroke (width 0.1) (type solid) ) (layer "${side}.Fab") )

    `;
    for(let c = 0; c < total_pin_cnt; c++) {
    	header += `
    	(pad ${pad_cnt} thru_hole ${c == 0? "rect": "circle"} (at ${x} ${y}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Paste *.Mask) (remove_unused_layers no) ${values[pinout_start_index + pad_cnt - 1]})`;

    	pad_cnt += 1;
    	y += p.pin_spacing;
    }

    // (attr exclude_from_pos_files exclude_from_bom)
  const common_top = `
  (footprint "custom:pin_header_2_54"
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -15 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )

    `;

    return common_top + header + `
      )
      `;
  }
}
