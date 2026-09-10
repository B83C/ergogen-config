function assert(condition, message = "Assertion failed") {
  if (!condition) throw new Error(message);
}
function err(message = "Unknown error occurred") {
  throw new Error(message);
}

module.exports = {
  params: {
    designator: 'MouseBites',
    include_traces: 1,

    outer_holes_cnt: 2,

    npth_diameter: 0.5,

    spacing: 0.7,

    rotation: 180,

    column_separation: 0, //0 for none 
  },
  body: p => {
    let mouse_bites= `
    `;

    const cos = Math.cos(p.rotation * Math.PI / 180 );
    const sin = Math.sin(p.rotation * Math.PI / 180 );
    const total_num = (p.outer_holes_cnt + p.include_traces) * 2 - 1;
    let pos = (p.spacing / 2) * (total_num  - 1);

    let separation = p.column_separation;
    const dx = - sin * p.spacing;
    const dy= - cos * p.spacing;
    let x = sin * pos;
    let y = cos * pos;

    let skip_bits = 0;
    for(let c = 0; c < p.include_traces; c++) {
      skip_bits |= 0b1 << (c * 2 + p.outer_holes_cnt);
    }
    for(let c = 0; c < total_num; c++) {
      if(!((skip_bits >> c) & 0b1)) {
      	mouse_bites += `
          (pad "" np_thru_hole circle (at ${x - separation * cos / 2} ${y + separation * sin / 2}) (size ${p.npth_diameter} ${p.npth_diameter}) (drill ${p.npth_diameter}) (layers *.Cu *.Mask))`;
        if (separation !== 0) {
        	mouse_bites += `
            (pad "" np_thru_hole circle (at ${x + separation * cos / 2} ${y - separation * sin / 2}) (size ${p.npth_diameter} ${p.npth_diameter}) (drill ${p.npth_diameter}) (layers *.Cu *.Mask))`;
        }
      }
      x += dx;
      y += dy;
    } 

    // (attr exclude_from_pos_files exclude_from_bom)
    const common_top = `
  (footprint "custom:mouse_bites"
    ${p.at}
    `;

    return common_top + mouse_bites + `
      )
      `;
  }
}
