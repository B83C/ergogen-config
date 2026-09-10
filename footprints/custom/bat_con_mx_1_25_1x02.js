module.exports = {
  params: {
    designator: 'CONN',
    side: 'F',
    reversible: false,
    include_silkscreen: true,
    include_fabrication: true,
    include_courtyard: true,
    BAT_P: { type: 'net', value: 'BAT_P' },
    BAT_N: { type: 'net', value: 'GND' },
  },
  body: p => {
    let side = p.side;
    let layer = p.reversible? '*': side;
    let otherside = side == 'F'? 'B': 'F';
    const top = `
  (footprint "custom:bat_con_mx_1_25_1x02"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0.1 3.9 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (attr smd)
    `;

      const silkscreen = `
    (fp_line (start -2.59 3.64) (end -2.05 3.10) (layer F.SilkS) (width 0.25))
  	(fp_line (start -2.05 3.10) (end 2.05 3.10) (layer F.SilkS) (width 0.25))
  	(fp_line (start 2.05 3.10) (end 2.60 3.64) (layer F.SilkS) (width 0.25))
  	(fp_line (start 1.26 -1.75) (end 3.85 -1.75) (layer F.SilkS) (width 0.25))
  	(fp_line (start 3.85 -1.75) (end 3.85 0.53) (layer F.SilkS) (width 0.25))
  	(fp_line (start -1.25 -1.75) (end -3.80 -1.75) (layer F.SilkS) (width 0.25))
  	(fp_line (start -3.80 -1.75) (end -3.80 0.53) (layer F.SilkS) (width 0.25))
    `;

    const pads = `
    	(pad 2 smd rect (at 0.62 -2.44 ${p.r}) (size 0.80 1.90) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.BAT_N})
    	(pad 1 smd rect (at -0.63 -2.44 ${p.r}) (size 0.80 1.90) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.BAT_P})
    	(pad 4 smd rect (at -3.47 2.44 ${p.r}) (size 1.30 3.35) (layers ${side}.Cu ${side}.Paste ${side}.Mask))
    	(pad 3 smd rect (at 3.47 2.44 ${p.r}) (size 1.30 3.35) (layers ${side}.Cu ${side}.Paste ${side}.Mask))
  	`;

    const reversed_pads = `
    	(pad 2 smd rect (at -0.62 -2.44 ${p.r}) (size 0.80 1.90) (layers ${otherside}.Cu ${otherside}.Paste ${otherside}.Mask) ${p.BAT_N})
    	(pad 1 smd rect (at 0.63 -2.44 ${p.r}) (size 0.80 1.90) (layers ${otherside}.Cu ${otherside}.Paste ${otherside}.Mask) ${p.BAT_P})
    	(pad 4 smd rect (at 3.47 2.44 ${p.r}) (size 1.30 3.35) (layers ${otherside}.Cu ${otherside}.Paste ${otherside}.Mask))
    	(pad 3 smd rect (at -3.47 2.44 ${p.r}) (size 1.30 3.35) (layers ${otherside}.Cu ${otherside}.Paste ${otherside}.Mask))
  	`;

  	const fab = `
    	(fp_circle (center -3.96 -2.73) (end -3.93 -2.73) (layer F.Fab) (width 0.06))
    	(fp_circle (center -1.55 -2.35) (end -1.40 -2.35) (layer Cmts.User) (width 0.30))
    	(fp_circle (center -1.55 -2.35) (end -1.40 -2.35) (layer F.SilkS) (width 0.30))
  	`;
    const bottom = `
  )
    `
    let final = top;
    final += pads;
    if(p.reversible) final += reversed_pads;
    if(p.include_silkscreen) final += silkscreen;
    if(p.include_fabrication) final += fab;
    final += bottom;
    return final;
  }
}
