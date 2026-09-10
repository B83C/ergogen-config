module.exports = {
  params: {
    designator: 'S',
    side: 'B',
    reversible: true,
    // include_traces_vias: true,
    trace_width: 0.2,
    // via_size: 0.6,
    // via_drill: 0.3,
    locked_traces_vias: false,
    include_plated_holes: false,
    include_stabilizer_nets: false,
    include_centerhole_net: false,
    // solder: false,
    outer_pad_width_front: 2.6,
    outer_pad_width_back: 2.6,
    outer_pad_height: 2.5,
    stabilizers_diameter: 1.7, // For tight fit
    include_keycap: false,
    keycap_width: 18,
    keycap_height: 18,
    include_corner_marks: false,
    // include_silkscreen: true,
    switch_3dmodel_filename: '',
    switch_3dmodel_xyz_offset: [0, 0, 0],
    switch_3dmodel_xyz_rotation: [0, 0, 0],
    switch_3dmodel_xyz_scale: [1, 1, 1],
    hotswap_3dmodel_filename: '',
    hotswap_3dmodel_xyz_offset: [0, 0, 0],
    hotswap_3dmodel_xyz_rotation: [0, 0, 0],
    hotswap_3dmodel_xyz_scale: [1, 1, 1],
    keycap_3dmodel_filename: '',
    keycap_3dmodel_xyz_offset: [0, 0, 0],
    keycap_3dmodel_xyz_rotation: [0, 0, 0],
    keycap_3dmodel_xyz_scale: [1, 1, 1],

    from: undefined,
    to: undefined,

    CENTERHOLE: { type: 'net', value: 'GND'},
    LEFTSTAB: { type: 'net', value: 'D1' },
    RIGHTSTAB: { type: 'net', value: 'D2' },

    centre_hole_diameter: 6.2,
    satelite_hole_diameter: 2.1,
    satelite_distance: 3.75,
  },
  body: p => {
    const common_top = `
  (footprint "b83c:custom_universal"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -7.5 180)
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    `

    const r1 = p.centre_hole_diameter / 2;
    const r2 = p.satelite_hole_diameter / 2;
    const d = p.satelite_distance;
    const cos = (r1 ** 2 + d ** 2 - r2 ** 2) / (2 * r1 * d);
    const sin = Math.sqrt(1 - cos ** 2);
    const y = r1 * cos;
    const x = r1 * sin;
    const middle_hole_edge_cut = `
  	(fp_arc (start -${x} ${y}) (mid 0 -${r1}) (end ${x} ${y}) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts"))
  	(fp_arc (start ${x} ${y}) (mid 0 ${r2 + d}) (end -${x} ${y}) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts"))
    `
    const corner_marks = `
    (fp_line (start -7 -6) (end -7 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -7 7) (end -6 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -6 -7) (end -7 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -7 7) (end -7 6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 6) (end 7 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 -7) (end 6 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 6 7) (end 7 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 -7) (end 7 -6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    `
    const keycap_xo = 0.5 * p.keycap_width
    const keycap_yo = 0.5 * p.keycap_height
    const keycap_marks = `
    (fp_rect (start ${keycap_xo} ${keycap_yo}) (end ${-keycap_xo} ${-keycap_yo}) (layer "Dwgs.User") (stroke (width 0.15) (type solid)) (fill none))
    `

    const front = `
    (pad "" np_thru_hole circle (at 5.5 0) (size ${p.stabilizers_diameter} ${p.stabilizers_diameter}) (drill ${p.stabilizers_diameter}) (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle (at -5.5 0) (size ${p.stabilizers_diameter} ${p.stabilizers_diameter}) (drill ${p.stabilizers_diameter}) (layers "*.Cu" "*.Mask"))

    (pad "" thru_hole circle (at -5 -5.15) (size 2 2) (drill 1) (layers "*.Cu" "*.Mask"))

		(pad "1" thru_hole oval (at 0 6.1 ${p.r}) (size 2.6 2) (drill 1.5) (layers "*.Cu" "*.Mask") ${p.to})
  	(pad "2" thru_hole circle (at 4.15 3.35) (size 2.6 2.6) (drill 1.5) (layers "*.Cu" "*.Mask") ${p.from})
  	(pad "2" thru_hole circle (at -5 3.8) (size 2.6 2.6) (drill 1.5) (layers "*.Cu" "*.Mask") ${p.from})

    `
  	// Gateron failed
  	// (pad "1" thru_hole circle (at 2.4 5.9) (size 2 2) (drill 1.5) (layers "*.Cu" "*.Mask") ${p.to})
  	// (pad "2" thru_hole circle (at -4.5 4.5) (size 2 2) (drill 1.5) (layers "*.Cu" "*.Mask") ${p.from})

    const back = `
    (pad "" thru_hole circle (at 5 -5.15) (size 2 2) (drill 1) (layers "*.Cu" "*.Mask"))

  	(pad "2" thru_hole circle (at -4.15 3.35 180) (size 2.6 2.6) (drill 1.5) (layers "*.Cu" "*.Mask") ${p.from})
  	(pad "2" thru_hole circle (at 5 3.8) (size 2.6 2.6) (drill 1.5) (layers "*.Cu" "*.Mask") ${p.from})
    `
    const switch_3dmodel = `
    (model ${p.switch_3dmodel_filename}
      (offset (xyz ${p.switch_3dmodel_xyz_offset[0]} ${p.switch_3dmodel_xyz_offset[1]} ${p.switch_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.switch_3dmodel_xyz_scale[0]} ${p.switch_3dmodel_xyz_scale[1]} ${p.switch_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.switch_3dmodel_xyz_rotation[0]} ${p.switch_3dmodel_xyz_rotation[1]} ${p.switch_3dmodel_xyz_rotation[2]}))
    )
    `

    const hotswap_3dmodel = `
    (model ${p.hotswap_3dmodel_filename}
      (offset (xyz ${p.hotswap_3dmodel_xyz_offset[0]} ${p.hotswap_3dmodel_xyz_offset[1]} ${p.hotswap_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.hotswap_3dmodel_xyz_scale[0]} ${p.hotswap_3dmodel_xyz_scale[1]} ${p.hotswap_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.hotswap_3dmodel_xyz_rotation[0]} ${p.hotswap_3dmodel_xyz_rotation[1]} ${p.hotswap_3dmodel_xyz_rotation[2]}))
    )
	  `

    const keycap_3dmodel = `
    (model ${p.keycap_3dmodel_filename}
      (offset (xyz ${p.keycap_3dmodel_xyz_offset[0]} ${p.keycap_3dmodel_xyz_offset[1]} ${p.keycap_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.keycap_3dmodel_xyz_scale[0]} ${p.keycap_3dmodel_xyz_scale[1]} ${p.keycap_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.keycap_3dmodel_xyz_rotation[0]} ${p.keycap_3dmodel_xyz_rotation[1]} ${p.keycap_3dmodel_xyz_rotation[2]}))
    )
	  `
    const common_bottom = `
  )
    `
    let final = common_top;
    if (p.include_corner_marks) {
      final += corner_marks;
    }
    if (p.include_keycap) {
      final += keycap_marks;
    }
    final += middle_hole_edge_cut;

    if (p.reversible || p.side == "F") {
      final += front;
    }
    if (p.reversible || p.side == "B") {
      final += back;
    }

    if (p.switch_3dmodel_filename) {
      final += switch_3dmodel
    }

    if (p.keycap_3dmodel_filename) {
      final += keycap_3dmodel
    }

    final += common_bottom
    return final
  }
}
