// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @dieseltravis + @ceoloide improvements
//
// Description:
//  A 5mm x 5mmm Ergogen logo that can be scaled and assigned to any layer of your board.
//  Make sure to add it to your board and spread the love <3
//
//  Note that some fine details may be lost depending on scale and fab capabilities.
//
// Params:
//    side: default is F for Front
//      the side on which to place the logo. When the backside is selected, the logo will
//      be mirrored automatically
//    layer: default is 'SilkS' (Silkscreen layer)
//      the layer where the logo will be placed, useful to have copper + soldermask texts
//    reversible: default is false
//      adds the logo on both sides, taking care of mirroring the backside
//    scale: default is 1.0 (100%)
//      the scale ratio to apply to the logo, to make it bigger or smaller
//
// @ceoloide's improvements:
//  - Mirror the logo when added to the back layer
//  - Add reversible option to add the logo on both layers
//  - Ensure numbers have at most 6 decimals (KiCad max precision)
//  - Upgrade to KiCad 8

module.exports = {
  params: {
    designator: 'LOGO',
    side: 'F',
    layer: 'SilkS',
    reversible: false,
    scale: 1.0,
  },
  body: p => {
    const scaled_point = (x, y, scale, mirrored) => {
      let scaled_x = x * scale * (mirrored ? -1.0 : 1.0)
      let scaled_y = y * scale
      return `(xy ${scaled_x.toFixed(6)} ${scaled_y.toFixed(6)})`
    }
    const fp_poly = (side, layer, scale, mirrored) => {
      const s = scale
      const m = mirrored
      return `
      	(fp_poly
      		(pts
      			${scaled_point(2.620232, -0.003605, s, m)} ${scaled_point(2.616401, 1.664982, s, m)} ${scaled_point(1.804465, 1.668706, s, m)} ${scaled_point(0.992529, 1.672431, s, m)} ${scaled_point(1.020945, 1.632668, s, m)}
      			${scaled_point(1.048679, 1.597774, s, m)} ${scaled_point(1.085278, 1.556426, s, m)} ${scaled_point(1.100459, 1.540424, s, m)} ${scaled_point(1.127973, 1.51036, s, m)} ${scaled_point(1.168814, 1.463451, s, m)}
      			${scaled_point(1.218204, 1.405286, s, m)} ${scaled_point(1.271363, 1.341457, s, m)} ${scaled_point(1.291471, 1.316985, s, m)} ${scaled_point(1.345383, 1.251866, s, m)} ${scaled_point(1.397926, 1.189745, s, m)}
      			${scaled_point(1.444125, 1.13641, s, m)} ${scaled_point(1.479007, 1.097651, s, m)} ${scaled_point(1.487852, 1.088365, s, m)} ${scaled_point(1.530982, 1.041596, s, m)} ${scaled_point(1.57449, 0.990274, s, m)}
      			${scaled_point(1.590236, 0.970266, s, m)} ${scaled_point(1.636151, 0.909829, s, m)} ${scaled_point(1.751475, 0.905396, s, m)} ${scaled_point(1.866798, 0.900964, s, m)} ${scaled_point(1.866798, 0.014415, s, m)}
      			${scaled_point(1.866798, -0.872135, s, m)} ${scaled_point(1.71904, -0.876243, s, m)} ${scaled_point(1.65775, -0.878883, s, m)} ${scaled_point(1.608933, -0.882767, s, m)} ${scaled_point(1.578601, -0.887308, s, m)}
      			${scaled_point(1.571582, -0.890658, s, m)} ${scaled_point(1.580395, -0.904634, s, m)} ${scaled_point(1.604652, -0.936996, s, m)} ${scaled_point(1.641386, -0.983944, s, m)} ${scaled_point(1.687631, -1.041676, s, m)}
      			${scaled_point(1.731531, -1.095574, s, m)} ${scaled_point(1.788136, -1.164993, s, m)} ${scaled_point(1.842247, -1.23211, s, m)} ${scaled_point(1.889535, -1.2915, s, m)} ${scaled_point(1.92567, -1.337738, s, m)}
      			${scaled_point(1.941482, -1.358656, s, m)} ${scaled_point(1.970533, -1.395381, s, m)} ${scaled_point(1.994156, -1.420233, s, m)} ${scaled_point(2.004973, -1.427129, s, m)} ${scaled_point(2.016678, -1.438823, s, m)}
      			${scaled_point(2.01816, -1.448752, s, m)} ${scaled_point(2.025189, -1.467947, s, m)} ${scaled_point(2.031153, -1.470375, s, m)} ${scaled_point(2.04516, -1.481116, s, m)} ${scaled_point(2.07152, -1.509819, s, m)}
      			${scaled_point(2.105528, -1.551204, s, m)} ${scaled_point(2.121101, -1.571283, s, m)} ${scaled_point(2.198057, -1.672192, s, m)} ${scaled_point(2.411059, -1.672192, s, m)} ${scaled_point(2.624062, -1.672192, s, m)}
      		)
      		(stroke
      			(width 0)
      			(type solid)
      		)
      		(fill yes)
      		(layer "${side}.SilkS")
      	)
      	(fp_poly
      		(pts
      			${scaled_point(-1.724802, -1.672071, s, m)} ${scaled_point(-1.57458, -1.671682, s, m)} ${scaled_point(-1.449452, -1.670981, s, m)} ${scaled_point(-1.347553, -1.669924, s, m)}
      			${scaled_point(-1.267015, -1.66847, s, m)} ${scaled_point(-1.205971, -1.666575, s, m)} ${scaled_point(-1.162553, -1.664195, s, m)} ${scaled_point(-1.134894, -1.661289, s, m)}
      			${scaled_point(-1.121128, -1.657813, s, m)} ${scaled_point(-1.119066, -1.654172, s, m)} ${scaled_point(-1.134276, -1.632593, s, m)} ${scaled_point(-1.162158, -1.596058, s, m)}
      			${scaled_point(-1.19746, -1.551131, s, m)} ${scaled_point(-1.234932, -1.504379, s, m)} ${scaled_point(-1.269324, -1.462366, s, m)} ${scaled_point(-1.295387, -1.431658, s, m)}
      			${scaled_point(-1.306392, -1.419921, s, m)} ${scaled_point(-1.32118, -1.403301, s, m)} ${scaled_point(-1.349336, -1.368827, s, m)} ${scaled_point(-1.38677, -1.32159, s, m)}
      			${scaled_point(-1.427949, -1.268559, s, m)} ${scaled_point(-1.473455, -1.210085, s, m)} ${scaled_point(-1.516607, -1.155834, s, m)} ${scaled_point(-1.552152, -1.112342, s, m)}
      			${scaled_point(-1.572779, -1.088366, s, m)} ${scaled_point(-1.605088, -1.050773, s, m)} ${scaled_point(-1.642782, -1.003884, s, m)} ${scaled_point(-1.660889, -0.980251, s, m)}
      			${scaled_point(-1.709518, -0.915381, s, m)} ${scaled_point(-1.824197, -0.908173, s, m)} ${scaled_point(-1.938877, -0.900966, s, m)} ${scaled_point(-1.938877, -0.000001, s, m)}
      			${scaled_point(-1.938877, 0.900964, s, m)} ${scaled_point(-1.791119, 0.905072, s, m)} ${scaled_point(-1.72979, 0.9075, s, m)} ${scaled_point(-1.680895, 0.910811, s, m)} ${scaled_point(-1.65046, 0.914513, s, m)}
      			${scaled_point(-1.643361, 0.917144, s, m)} ${scaled_point(-1.652121, 0.930619, s, m)} ${scaled_point(-1.675979, 0.961438, s, m)} ${scaled_point(-1.711296, 1.005029, s, m)} ${scaled_point(-1.754438, 1.056819, s, m)}
      			${scaled_point(-1.754751, 1.05719, s, m)} ${scaled_point(-1.800466, 1.111397, s, m)} ${scaled_point(-1.84109, 1.159568, s, m)} ${scaled_point(-1.872024, 1.196248, s, m)} ${scaled_point(-1.888094, 1.215304, s, m)}
      			${scaled_point(-1.911686, 1.242454, s, m)} ${scaled_point(-1.943594, 1.278233, s, m)} ${scaled_point(-1.953293, 1.288954, s, m)} ${scaled_point(-1.978027, 1.317295, s, m)} ${scaled_point(-2.016342, 1.362522, s, m)}
      			${scaled_point(-2.063635, 1.419146, s, m)} ${scaled_point(-2.115303, 1.481679, s, m)} ${scaled_point(-2.133486, 1.503843, s, m)} ${scaled_point(-2.270432, 1.671114, s, m)} ${scaled_point(-2.48306, 1.671652, s, m)}
      			${scaled_point(-2.695688, 1.67219, s, m)} ${scaled_point(-2.695688, -0.000001, s, m)} ${scaled_point(-2.695688, -1.672192, s, m)} ${scaled_point(-1.901988, -1.672192, s, m)}
      		)
      		(stroke
      			(width 0)
      			(type solid)
      		)
      		(fill yes)
      		(layer "${side}.SilkS")
      	)
      	(fp_poly
      		(pts
      			${scaled_point(2.508285, -2.437815, s, m)} ${scaled_point(2.499034, -2.421708, s, m)} ${scaled_point(2.475554, -2.393554, s, m)} ${scaled_point(2.460344, -2.377347, s, m)} ${scaled_point(2.434416, -2.348751, s, m)}
      			${scaled_point(2.395064, -2.302929, s, m)} ${scaled_point(2.346792, -2.245233, s, m)} ${scaled_point(2.294105, -2.181017, s, m)} ${scaled_point(2.26934, -2.150404, s, m)} ${scaled_point(2.177759, -2.036798, s, m)}
      			${scaled_point(2.101833, -1.942947, s, m)} ${scaled_point(2.039269, -1.866047, s, m)} ${scaled_point(1.987769, -1.803293, s, m)} ${scaled_point(1.945041, -1.75188, s, m)} ${scaled_point(1.908787, -1.709002, s, m)}
      			${scaled_point(1.895758, -1.693815, s, m)} ${scaled_point(1.860049, -1.651705, s, m)} ${scaled_point(1.809728, -1.591433, s, m)} ${scaled_point(1.748306, -1.517258, s, m)} ${scaled_point(1.679294, -1.43344, s, m)}
      			${scaled_point(1.606202, -1.34424, s, m)} ${scaled_point(1.532543, -1.253917, s, m)} ${scaled_point(1.489125, -1.200449, s, m)} ${scaled_point(1.447338, -1.150061, s, m)} ${scaled_point(1.406173, -1.102345, s, m)}
      			${scaled_point(1.373701, -1.06663, s, m)} ${scaled_point(1.370349, -1.063161, s, m)} ${scaled_point(1.340954, -1.029133, s, m)} ${scaled_point(1.32108, -0.998918, s, m)} ${scaled_point(1.318193, -0.992085, s, m)}
      			${scaled_point(1.30627, -0.970219, s, m)} ${scaled_point(1.298749, -0.965835, s, m)} ${scaled_point(1.285713, -0.955162, s, m)} ${scaled_point(1.259617, -0.926433, s, m)} ${scaled_point(1.224799, -0.884586, s, m)}
      			${scaled_point(1.200651, -0.854116, s, m)} ${scaled_point(1.158023, -0.800272, s, m)} ${scaled_point(1.117113, -0.750154, s, m)} ${scaled_point(1.084311, -0.711529, s, m)} ${scaled_point(1.073505, -0.699547, s, m)}
      			${scaled_point(1.04851, -0.671106, s, m)} ${scaled_point(1.011059, -0.626333, s, m)} ${scaled_point(0.966433, -0.571622, s, m)} ${scaled_point(0.924646, -0.519354, s, m)} ${scaled_point(0.880331, -0.463918, s, m)}
      			${scaled_point(0.840688, -0.415344, s, m)} ${scaled_point(0.810124, -0.378967, s, m)} ${scaled_point(0.793325, -0.360387, s, m)} ${scaled_point(0.772984, -0.338495, s, m)} ${scaled_point(0.741529, -0.302015, s, m)}
      			${scaled_point(0.706292, -0.259479, s, m)} ${scaled_point(0.673405, -0.219261, s, m)} ${scaled_point(0.647767, -0.188401, s, m)} ${scaled_point(0.634659, -0.173249, s, m)} ${scaled_point(0.634395, -0.172986, s, m)}
      			${scaled_point(0.622094, -0.15806, s, m)} ${scaled_point(0.599113, -0.12808, s, m)} ${scaled_point(0.584199, -0.108117, s, m)} ${scaled_point(0.546904, -0.060351, s, m)} ${scaled_point(0.506315, -0.012001, s, m)}
      			${scaled_point(0.495626, -0.000001, s, m)} ${scaled_point(0.466337, 0.033664, s, m)} ${scaled_point(0.425889, 0.082035, s, m)} ${scaled_point(0.380912, 0.137129, s, m)} ${scaled_point(0.357942, 0.165777, s, m)}
      			${scaled_point(0.314237, 0.219901, s, m)} ${scaled_point(0.272574, 0.270164, s, m)} ${scaled_point(0.239124, 0.309181, s, m)} ${scaled_point(0.226453, 0.323181, s, m)} ${scaled_point(0.194939, 0.358922, s, m)}
      			${scaled_point(0.156863, 0.405245, s, m)} ${scaled_point(0.133675, 0.434901, s, m)} ${scaled_point(0.103854, 0.471718, s, m)} ${scaled_point(0.080076, 0.496959, s, m)} ${scaled_point(0.069114, 0.504539, s, m)}
      			${scaled_point(0.058643, 0.516094, s, m)} ${scaled_point(0.057661, 0.523928, s, m)} ${scaled_point(0.048533, 0.547401, s, m)} ${scaled_point(0.027703, 0.56967, s, m)} ${scaled_point(0.005003, 0.582181, s, m)}
      			${scaled_point(-0.007086, 0.580252, s, m)} ${scaled_point(-0.011962, 0.580112, s, m)} ${scaled_point(-0.007838, 0.588773, s, m)} ${scaled_point(-0.010675, 0.612263, s, m)} ${scaled_point(-0.037249, 0.650015, s, m)}
      			${scaled_point(-0.053618, 0.668058, s, m)} ${scaled_point(-0.095913, 0.714794, s, m)} ${scaled_point(-0.142176, 0.769231, s, m)} ${scaled_point(-0.16702, 0.800056, s, m)} ${scaled_point(-0.197988, 0.838281, s, m)}
      			${scaled_point(-0.222573, 0.866203, s, m)} ${scaled_point(-0.234342, 0.876968, s, m)} ${scaled_point(-0.244718, 0.883734, s, m)} ${scaled_point(-0.241907, 0.889511, s, m)} ${scaled_point(-0.224258, 0.894362, s, m)}
      			${scaled_point(-0.190121, 0.898356, s, m)} ${scaled_point(-0.137845, 0.901556, s, m)} ${scaled_point(-0.065781, 0.904029, s, m)} ${scaled_point(0.027721, 0.90584, s, m)} ${scaled_point(0.144311, 0.907055, s, m)}
      			${scaled_point(0.285639, 0.907739, s, m)} ${scaled_point(0.453356, 0.907959, s, m)} ${scaled_point(0.543495, 0.907919, s, m)} ${scaled_point(0.689887, 0.907886, s, m)} ${scaled_point(0.827404, 0.908046, s, m)}
      			${scaled_point(0.953382, 0.908382, s, m)} ${scaled_point(1.065162, 0.908877, s, m)} ${scaled_point(1.160081, 0.909517, s, m)} ${scaled_point(1.235477, 0.910283, s, m)} ${scaled_point(1.288689, 0.911161, s, m)}
      			${scaled_point(1.317055, 0.912134, s, m)} ${scaled_point(1.321086, 0.912648, s, m)} ${scaled_point(1.315706, 0.925377, s, m)} ${scaled_point(1.295669, 0.950558, s, m)} ${scaled_point(1.287072, 0.95997, s, m)}
      			${scaled_point(1.262253, 0.987637, s, m)} ${scaled_point(1.224386, 1.031393, s, m)} ${scaled_point(1.178753, 1.085077, s, m)} ${scaled_point(1.13372, 1.138819, s, m)} ${scaled_point(1.086736, 1.194909, s, m)}
      			${scaled_point(1.043697, 1.245583, s, m)} ${scaled_point(1.009451, 1.285179, s, m)} ${scaled_point(0.989213, 1.30765, s, m)} ${scaled_point(0.957306, 1.343606, s, m)} ${scaled_point(0.929795, 1.377874, s, m)}
      			${scaled_point(0.903074, 1.411038, s, m)} ${scaled_point(0.867006, 1.452961, s, m)} ${scaled_point(0.846582, 1.475728, s, m)} ${scaled_point(0.804795, 1.523171, s, m)} ${scaled_point(0.759441, 1.577162, s, m)}
      			${scaled_point(0.738466, 1.603138, s, m)} ${scaled_point(0.684732, 1.671034, s, m)} ${scaled_point(-0.103668, 1.671612, s, m)} ${scaled_point(-0.892069, 1.67219, s, m)} ${scaled_point(-1.112749, 1.778608, s, m)}
      			${scaled_point(-1.198331, 1.819777, s, m)} ${scaled_point(-1.286578, 1.862055, s, m)} ${scaled_point(-1.369238, 1.901499, s, m)} ${scaled_point(-1.438058, 1.934168, s, m)} ${scaled_point(-1.463168, 1.94601, s, m)}
      			${scaled_point(-1.527443, 1.976254, s, m)} ${scaled_point(-1.600004, 2.010447, s, m)} ${scaled_point(-1.675157, 2.0459, s, m)} ${scaled_point(-1.74721, 2.079925, s, m)} ${scaled_point(-1.810469, 2.109833, s, m)}
      			${scaled_point(-1.859239, 2.132936, s, m)} ${scaled_point(-1.887829, 2.146544, s, m)} ${scaled_point(-1.888423, 2.146829, s, m)} ${scaled_point(-1.914316, 2.159551, s, m)} ${scaled_point(-1.953193, 2.178936, s, m)}
      			${scaled_point(-1.967708, 2.186224, s, m)} ${scaled_point(-2.029486, 2.216731, s, m)} ${scaled_point(-2.116122, 2.258621, s, m)} ${scaled_point(-2.22627, 2.311249, s, m)} ${scaled_point(-2.358587, 2.373971, s, m)}
      			${scaled_point(-2.400171, 2.393606, s, m)} ${scaled_point(-2.462304, 2.423019, s, m)} ${scaled_point(-2.51488, 2.448095, s, m)} ${scaled_point(-2.552423, 2.466208, s, m)} ${scaled_point(-2.569459, 2.474733, s, m)}
      			${scaled_point(-2.569553, 2.474788, s, m)} ${scaled_point(-2.579897, 2.47065, s, m)} ${scaled_point(-2.580364, 2.46674, s, m)} ${scaled_point(-2.569802, 2.446502, s, m)} ${scaled_point(-2.565098, 2.44289, s, m)}
      			${scaled_point(-2.557618, 2.436307, s, m)} ${scaled_point(-2.54368, 2.421226, s, m)} ${scaled_point(-2.521813, 2.395859, s, m)} ${scaled_point(-2.490547, 2.358417, s, m)} ${scaled_point(-2.448412, 2.307112, s, m)}
      			${scaled_point(-2.393937, 2.240155, s, m)} ${scaled_point(-2.325653, 2.155757, s, m)} ${scaled_point(-2.24209, 2.052132, s, m)} ${scaled_point(-2.158501, 1.948282, s, m)} ${scaled_point(-2.114517, 1.89459, s, m)}
      			${scaled_point(-2.076249, 1.849709, s, m)} ${scaled_point(-2.047663, 1.818164, s, m)} ${scaled_point(-2.032726, 1.80448, s, m)} ${scaled_point(-2.032366, 1.804331, s, m)} ${scaled_point(-2.018851, 1.787826, s, m)}
      			${scaled_point(-2.018162, 1.782308, s, m)} ${scaled_point(-2.00816, 1.760356, s, m)} ${scaled_point(-1.991343, 1.742127, s, m)} ${scaled_point(-1.971307, 1.721219, s, m)} ${scaled_point(-1.939038, 1.683488, s, m)}
      			${scaled_point(-1.899706, 1.635093, s, m)} ${scaled_point(-1.873688, 1.601976, s, m)} ${scaled_point(-1.834747, 1.553165, s, m)} ${scaled_point(-1.801646, 1.514309, s, m)} ${scaled_point(-1.778633, 1.490244, s, m)}
      			${scaled_point(-1.770768, 1.484789, s, m)} ${scaled_point(-1.759683, 1.473267, s, m)} ${scaled_point(-1.758684, 1.465679, s, m)} ${scaled_point(-1.74886, 1.443754, s, m)} ${scaled_point(-1.724821, 1.415309, s, m)}
      			${scaled_point(-1.720947, 1.411621, s, m)} ${scaled_point(-1.69551, 1.384703, s, m)} ${scaled_point(-1.659027, 1.341917, s, m)} ${scaled_point(-1.617625, 1.290555, s, m)} ${scaled_point(-1.597658, 1.264809, s, m)}
      			${scaled_point(-1.557849, 1.213572, s, m)} ${scaled_point(-1.521959, 1.16883, s, m)} ${scaled_point(-1.495288, 1.137128, s, m)} ${scaled_point(-1.486716, 1.127863, s, m)} ${scaled_point(-1.46706, 1.106179, s, m)}
      			${scaled_point(-1.434702, 1.068115, s, m)} ${scaled_point(-1.394861, 1.019874, s, m)} ${scaled_point(-1.368595, 0.987457, s, m)} ${scaled_point(-1.316734, 0.92297, s, m)} ${scaled_point(-1.279893, 0.877209, s, m)}
      			${scaled_point(-1.255024, 0.84643, s, m)} ${scaled_point(-1.239084, 0.82689, s, m)} ${scaled_point(-1.229026, 0.814844, s, m)} ${scaled_point(-1.221806, 0.806548, s, m)} ${scaled_point(-1.217783, 0.802051, s, m)}
      			${scaled_point(-1.202906, 0.784327, s, m)} ${scaled_point(-1.174637, 0.749724, s, m)} ${scaled_point(-1.137571, 0.703891, s, m)} ${scaled_point(-1.110588, 0.670317, s, m)} ${scaled_point(-1.069159, 0.618983, s, m)}
      			${scaled_point(-1.032384, 0.574033, s, m)} ${scaled_point(-1.005327, 0.541624, s, m)} ${scaled_point(-0.995587, 0.530458, s, m)} ${scaled_point(-0.970741, 0.502226, s, m)} ${scaled_point(-0.958389, 0.487212, s, m)}
      			${scaled_point(-0.894252, 0.406217, s, m)} ${scaled_point(-0.836387, 0.334879, s, m)} ${scaled_point(-0.787607, 0.276564, s, m)} ${scaled_point(-0.750725, 0.234638, s, m)} ${scaled_point(-0.729141, 0.212947, s, m)}
      			${scaled_point(-0.710674, 0.194931, s, m)} ${scaled_point(-0.709273, 0.18772, s, m)} ${scaled_point(-0.707208, 0.178436, s, m)} ${scaled_point(-0.689558, 0.15573, s, m)} ${scaled_point(-0.682312, 0.147757, s, m)}
      			${scaled_point(-0.657779, 0.119624, s, m)} ${scaled_point(-0.621353, 0.075543, s, m)} ${scaled_point(-0.578695, 0.022438, s, m)} ${scaled_point(-0.549702, -0.014416, s, m)}
      			${scaled_point(-0.508007, -0.067134, s, m)} ${scaled_point(-0.470707, -0.112918, s, m)} ${scaled_point(-0.442622, -0.145924, s, m)} ${scaled_point(-0.430735, -0.158571, s, m)}
      			${scaled_point(-0.411774, -0.179162, s, m)} ${scaled_point(-0.380591, -0.216231, s, m)} ${scaled_point(-0.342507, -0.26338, s, m)} ${scaled_point(-0.322871, -0.28831, s, m)}
      			${scaled_point(-0.276456, -0.346961, s, m)} ${scaled_point(-0.220081, -0.417036, s, m)} ${scaled_point(-0.16234, -0.487894, s, m)} ${scaled_point(-0.130035, -0.527058, s, m)}
      			${scaled_point(-0.081151, -0.58609, s, m)} ${scaled_point(-0.03348, -0.643877, s, m)} ${scaled_point(0.006763, -0.692876, s, m)} ${scaled_point(0.02883, -0.719931, s, m)} ${scaled_point(0.068271, -0.76755, s, m)}
      			${scaled_point(0.109784, -0.816138, s, m)} ${scaled_point(0.1258, -0.834361, s, m)} ${scaled_point(0.153055, -0.8669, s, m)} ${scaled_point(0.169969, -0.890856, s, m)} ${scaled_point(0.17265, -0.897239, s, m)}
      			${scaled_point(0.158734, -0.899308, s, m)} ${scaled_point(0.118595, -0.90138, s, m)} ${scaled_point(0.054844, -0.903405, s, m)} ${scaled_point(-0.029912, -0.905337, s, m)} ${scaled_point(-0.133063, -0.907127, s, m)}
      			${scaled_point(-0.252001, -0.908727, s, m)} ${scaled_point(-0.384117, -0.910091, s, m)} ${scaled_point(-0.526801, -0.91117, s, m)} ${scaled_point(-0.615021, -0.911654, s, m)}
      			${scaled_point(-1.403027, -0.915381, s, m)} ${scaled_point(-1.318148, -1.016289, s, m)} ${scaled_point(-1.277404, -1.063492, s, m)} ${scaled_point(-1.240898, -1.103589, s, m)}
      			${scaled_point(-1.214422, -1.130302, s, m)} ${scaled_point(-1.207668, -1.136034, s, m)} ${scaled_point(-1.186933, -1.159929, s, m)} ${scaled_point(-1.182067, -1.175676, s, m)}
      			${scaled_point(-1.175484, -1.194349, s, m)} ${scaled_point(-1.170317, -1.196482, s, m)} ${scaled_point(-1.157162, -1.206965, s, m)} ${scaled_point(-1.12969, -1.235596, s, m)}
      			${scaled_point(-1.091767, -1.27815, s, m)} ${scaled_point(-1.047257, -1.330402, s, m)} ${scaled_point(-1.041732, -1.337033, s, m)} ${scaled_point(-0.990425, -1.398132, s, m)}
      			${scaled_point(-0.939297, -1.457952, s, m)} ${scaled_point(-0.894571, -1.509269, s, m)} ${scaled_point(-0.864715, -1.542453, s, m)} ${scaled_point(-0.828277, -1.583168, s, m)}
      			${scaled_point(-0.79718, -1.620403, s, m)} ${scaled_point(-0.782618, -1.639757, s, m)} ${scaled_point(-0.760703, -1.672192, s, m)} ${scaled_point(0.022549, -1.672192, s, m)}
      			${scaled_point(0.805802, -1.672192, s, m)} ${scaled_point(0.961499, -1.745463, s, m)} ${scaled_point(1.02713, -1.776244, s, m)} ${scaled_point(1.087206, -1.804229, s, m)} ${scaled_point(1.134629, -1.826125, s, m)}
      			${scaled_point(1.160442, -1.837819, s, m)} ${scaled_point(1.226656, -1.867162, s, m)} ${scaled_point(1.304155, -1.901699, s, m)} ${scaled_point(1.385617, -1.938147, s, m)} ${scaled_point(1.463722, -1.973225, s, m)}
      			${scaled_point(1.531148, -2.003648, s, m)} ${scaled_point(1.580575, -2.026135, s, m)} ${scaled_point(1.585697, -2.028489, s, m)} ${scaled_point(1.637078, -2.052043, s, m)} ${scaled_point(1.684734, -2.073726, s, m)}
      			${scaled_point(1.708228, -2.084311, s, m)} ${scaled_point(1.738602, -2.098302, s, m)} ${scaled_point(1.787724, -2.121392, s, m)} ${scaled_point(1.848371, -2.150168, s, m)} ${scaled_point(1.902837, -2.176192, s, m)}
      			${scaled_point(1.963136, -2.204743, s, m)} ${scaled_point(2.013687, -2.228012, s, m)} ${scaled_point(2.048992, -2.243514, s, m)} ${scaled_point(2.063374, -2.24878, s, m)} ${scaled_point(2.0795, -2.254521, s, m)}
      			${scaled_point(2.115768, -2.269998, s, m)} ${scaled_point(2.166254, -2.292625, s, m)} ${scaled_point(2.207528, -2.311637, s, m)} ${scaled_point(2.306048, -2.357305, s, m)} ${scaled_point(2.381362, -2.391703, s, m)}
      			${scaled_point(2.43627, -2.416008, s, m)} ${scaled_point(2.473574, -2.431394, s, m)} ${scaled_point(2.496074, -2.439036, s, m)} ${scaled_point(2.506571, -2.44011, s, m)}
      		)
      		(stroke
      			(width 0)
      			(type solid)
      		)
      		(fill yes)
      		(layer "${side}.SilkS")
      	)
      	(fp_poly
      		(pts
      			${scaled_point(0.03783, -4.99228, s, m)} ${scaled_point(0.078048, -4.983119, s, m)} ${scaled_point(0.090132, -4.976287, s, m)} ${scaled_point(0.104556, -4.958251, s, m)} ${scaled_point(0.130707, -4.919716, s, m)}
      			${scaled_point(0.165762, -4.865069, s, m)} ${scaled_point(0.206898, -4.798702, s, m)} ${scaled_point(0.245445, -4.734829, s, m)} ${scaled_point(0.292679, -4.655551, s, m)} ${scaled_point(0.328268, -4.597432, s, m)}
      			${scaled_point(0.355752, -4.557123, s, m)} ${scaled_point(0.37867, -4.531275, s, m)} ${scaled_point(0.400561, -4.51654, s, m)} ${scaled_point(0.424965, -4.509568, s, m)} ${scaled_point(0.455421, -4.50701, s, m)}
      			${scaled_point(0.487446, -4.505855, s, m)} ${scaled_point(0.507003, -4.51621, s, m)} ${scaled_point(0.542603, -4.546687, s, m)} ${scaled_point(0.591987, -4.595133, s, m)} ${scaled_point(0.652896, -4.659393, s, m)}
      			${scaled_point(0.682858, -4.692226, s, m)} ${scaled_point(0.741094, -4.755022, s, m)} ${scaled_point(0.795951, -4.811104, s, m)} ${scaled_point(0.843305, -4.856483, s, m)} ${scaled_point(0.879031, -4.887171, s, m)}
      			${scaled_point(0.896019, -4.898282, s, m)} ${scaled_point(0.95104, -4.907462, s, m)} ${scaled_point(1.008299, -4.894551, s, m)} ${scaled_point(1.055547, -4.862384, s, m)} ${scaled_point(1.05676, -4.861064, s, m)}
      			${scaled_point(1.068871, -4.83964, s, m)} ${scaled_point(1.088202, -4.796024, s, m)} ${scaled_point(1.112675, -4.735317, s, m)} ${scaled_point(1.140214, -4.66262, s, m)} ${scaled_point(1.160768, -4.605733, s, m)}
      			${scaled_point(1.188548, -4.52862, s, m)} ${scaled_point(1.213888, -4.460769, s, m)} ${scaled_point(1.234925, -4.406979, s, m)} ${scaled_point(1.249796, -4.372047, s, m)} ${scaled_point(1.255773, -4.361116, s, m)}
      			${scaled_point(1.277418, -4.34827, s, m)} ${scaled_point(1.314344, -4.333952, s, m)} ${scaled_point(1.324463, -4.330802, s, m)} ${scaled_point(1.379818, -4.314458, s, m)} ${scaled_point(1.551231, -4.443758, s, m)}
      			${scaled_point(1.633144, -4.505226, s, m)} ${scaled_point(1.695982, -4.551262, s, m)} ${scaled_point(1.743474, -4.584073, s, m)} ${scaled_point(1.779351, -4.605868, s, m)} ${scaled_point(1.807341, -4.618854, s, m)}
      			${scaled_point(1.831174, -4.625239, s, m)} ${scaled_point(1.85458, -4.627231, s, m)} ${scaled_point(1.86125, -4.627302, s, m)} ${scaled_point(1.912581, -4.617242, s, m)} ${scaled_point(1.959073, -4.591263, s, m)}
      			${scaled_point(1.990329, -4.555822, s, m)} ${scaled_point(1.995247, -4.544091, s, m)} ${scaled_point(1.999167, -4.524507, s, m)} ${scaled_point(2.006426, -4.482326, s, m)} ${scaled_point(2.016116, -4.423356, s, m)}
      			${scaled_point(2.027329, -4.353404, s, m)} ${scaled_point(2.039156, -4.278277, s, m)} ${scaled_point(2.05069, -4.203782, s, m)} ${scaled_point(2.061021, -4.135726, s, m)} ${scaled_point(2.069242, -4.079918, s, m)}
      			${scaled_point(2.074444, -4.042162, s, m)} ${scaled_point(2.075822, -4.028913, s, m)} ${scaled_point(2.087422, -4.019156, s, m)} ${scaled_point(2.11675, -4.0019, s, m)} ${scaled_point(2.13386, -3.992885, s, m)}
      			${scaled_point(2.191898, -3.963276, s, m)} ${scaled_point(2.423581, -4.071877, s, m)} ${scaled_point(2.521729, -4.116944, s, m)} ${scaled_point(2.598261, -4.149246, s, m)} ${scaled_point(2.657057, -4.169471, s, m)}
      			${scaled_point(2.701999, -4.178311, s, m)} ${scaled_point(2.736969, -4.176453, s, m)} ${scaled_point(2.765849, -4.164589, s, m)} ${scaled_point(2.792519, -4.143406, s, m)} ${scaled_point(2.797703, -4.13834, s, m)}
      			${scaled_point(2.816615, -4.118263, s, m)} ${scaled_point(2.828749, -4.099124, s, m)} ${scaled_point(2.83554, -4.074224, s, m)} ${scaled_point(2.838421, -4.036868, s, m)} ${scaled_point(2.838826, -3.980358, s, m)}
      			${scaled_point(2.838585, -3.947336, s, m)} ${scaled_point(2.83693, -3.865285, s, m)} ${scaled_point(2.833607, -3.77576, s, m)} ${scaled_point(2.829232, -3.694168, s, m)} ${scaled_point(2.827533, -3.66992, s, m)}
      			${scaled_point(2.817737, -3.541372, s, m)} ${scaled_point(2.861223, -3.500606, s, m)} ${scaled_point(2.894353, -3.474703, s, m)} ${scaled_point(2.923055, -3.46062, s, m)} ${scaled_point(2.928789, -3.459772, s, m)}
      			${scaled_point(2.950423, -3.463152, s, m)} ${scaled_point(2.994677, -3.472533, s, m)} ${scaled_point(3.056258, -3.486711, s, m)} ${scaled_point(3.129871, -3.504479, s, m)} ${scaled_point(3.18106, -3.51723, s, m)}
      			${scaled_point(3.260061, -3.536718, s, m)} ${scaled_point(3.330879, -3.553392, s, m)} ${scaled_point(3.388082, -3.566033, s, m)} ${scaled_point(3.426241, -3.573424, s, m)} ${scaled_point(3.438081, -3.574838, s, m)}
      			${scaled_point(3.469439, -3.567576, s, m)} ${scaled_point(3.508127, -3.549699, s, m)} ${scaled_point(3.51298, -3.546832, s, m)} ${scaled_point(3.539487, -3.527321, s, m)} ${scaled_point(3.557326, -3.503809, s, m)}
      			${scaled_point(3.566546, -3.47238, s, m)} ${scaled_point(3.567197, -3.429121, s, m)} ${scaled_point(3.559326, -3.370115, s, m)} ${scaled_point(3.542984, -3.291449, s, m)} ${scaled_point(3.518219, -3.189207, s, m)}
      			${scaled_point(3.517491, -3.186309, s, m)} ${scaled_point(3.498162, -3.10588, s, m)} ${scaled_point(3.482446, -3.03354, s, m)} ${scaled_point(3.471366, -2.9746, s, m)} ${scaled_point(3.465946, -2.934371, s, m)}
      			${scaled_point(3.466131, -2.919945, s, m)} ${scaled_point(3.481419, -2.888323, s, m)} ${scaled_point(3.506719, -2.853944, s, m)} ${scaled_point(3.523442, -2.836801, s, m)} ${scaled_point(3.54071, -2.826695, s, m)}
      			${scaled_point(3.565492, -2.822486, s, m)} ${scaled_point(3.604753, -2.823036, s, m)} ${scaled_point(3.665463, -2.827207, s, m)} ${scaled_point(3.66881, -2.827461, s, m)} ${scaled_point(3.744441, -2.832102, s, m)}
      			${scaled_point(3.833387, -2.835898, s, m)} ${scaled_point(3.920134, -2.83823, s, m)} ${scaled_point(3.947334, -2.838587, s, m)} ${scaled_point(4.014509, -2.838823, s, m)} ${scaled_point(4.059552, -2.83722, s, m)}
      			${scaled_point(4.089162, -2.832344, s, m)} ${scaled_point(4.110036, -2.822762, s, m)} ${scaled_point(4.128869, -2.80704, s, m)} ${scaled_point(4.138338, -2.797705, s, m)} ${scaled_point(4.161228, -2.771014, s, m)}
      			${scaled_point(4.174932, -2.742858, s, m)} ${scaled_point(4.17876, -2.709356, s, m)} ${scaled_point(4.172025, -2.666626, s, m)} ${scaled_point(4.154035, -2.610786, s, m)} ${scaled_point(4.124101, -2.537954, s, m)}
      			${scaled_point(4.081534, -2.444249, s, m)} ${scaled_point(4.071875, -2.423583, s, m)} ${scaled_point(3.963274, -2.1919, s, m)} ${scaled_point(3.992883, -2.133862, s, m)} ${scaled_point(4.011873, -2.099153, s, m)}
      			${scaled_point(4.025698, -2.078413, s, m)} ${scaled_point(4.028912, -2.075824, s, m)} ${scaled_point(4.048274, -2.073653, s, m)} ${scaled_point(4.090283, -2.067744, s, m)} ${scaled_point(4.149131, -2.059007, s, m)}
      			${scaled_point(4.219013, -2.04835, s, m)} ${scaled_point(4.29412, -2.03668, s, m)} ${scaled_point(4.368646, -2.024906, s, m)} ${scaled_point(4.436782, -2.013937, s, m)} ${scaled_point(4.492723, -2.00468, s, m)}
      			${scaled_point(4.53066, -1.998043, s, m)} ${scaled_point(4.54409, -1.995249, s, m)} ${scaled_point(4.581135, -1.970726, s, m)} ${scaled_point(4.610691, -1.927787, s, m)} ${scaled_point(4.626302, -1.876832, s, m)}
      			${scaled_point(4.627301, -1.861252, s, m)} ${scaled_point(4.626109, -1.837328, s, m)} ${scaled_point(4.621116, -1.813975, s, m)} ${scaled_point(4.610114, -1.787464, s, m)} ${scaled_point(4.590894, -1.754063, s, m)}
      			${scaled_point(4.561248, -1.710046, s, m)} ${scaled_point(4.518968, -1.651681, s, m)} ${scaled_point(4.461847, -1.575239, s, m)} ${scaled_point(4.443756, -1.551233, s, m)} ${scaled_point(4.314456, -1.37982, s, m)}
      			${scaled_point(4.330801, -1.324465, s, m)} ${scaled_point(4.344614, -1.2857, s, m)} ${scaled_point(4.358352, -1.259054, s, m)} ${scaled_point(4.361115, -1.255775, s, m)} ${scaled_point(4.378793, -1.24674, s, m)}
      			${scaled_point(4.41892, -1.230143, s, m)} ${scaled_point(4.476698, -1.207848, s, m)} ${scaled_point(4.54733, -1.181719, s, m)} ${scaled_point(4.605731, -1.160769, s, m)} ${scaled_point(4.683903, -1.13231, s, m)}
      			${scaled_point(4.753755, -1.105421, s, m)} ${scaled_point(4.810187, -1.082179, s, m)} ${scaled_point(4.848099, -1.064662, s, m)} ${scaled_point(4.861063, -1.056762, s, m)} ${scaled_point(4.893842, -1.009949, s, m)}
      			${scaled_point(4.907384, -0.952694, s, m)} ${scaled_point(4.898858, -0.897245, s, m)} ${scaled_point(4.89828, -0.895853, s, m)} ${scaled_point(4.881623, -0.871831, s, m)} ${scaled_point(4.847212, -0.832999, s, m)}
      			${scaled_point(4.799033, -0.783488, s, m)} ${scaled_point(4.74107, -0.727426, s, m)} ${scaled_point(4.692224, -0.682342, s, m)} ${scaled_point(4.623242, -0.618451, s, m)} ${scaled_point(4.568011, -0.564185, s, m)}
      			${scaled_point(4.528932, -0.522059, s, m)} ${scaled_point(4.508406, -0.494589, s, m)} ${scaled_point(4.505853, -0.487097, s, m)} ${scaled_point(4.507308, -0.449133, s, m)} ${scaled_point(4.510425, -0.420099, s, m)}
      			${scaled_point(4.518556, -0.396457, s, m)} ${scaled_point(4.53505, -0.374673, s, m)} ${scaled_point(4.563258, -0.351211, s, m)} ${scaled_point(4.60653, -0.322535, s, m)} ${scaled_point(4.668216, -0.285108, s, m)}
      			${scaled_point(4.734827, -0.245447, s, m)} ${scaled_point(4.807822, -0.201317, s, m)} ${scaled_point(4.872915, -0.160811, s, m)} ${scaled_point(4.925718, -0.126751, s, m)} ${scaled_point(4.961842, -0.101963, s, m)}
      			${scaled_point(4.976286, -0.090134, s, m)} ${scaled_point(4.987574, -0.062661, s, m)} ${scaled_point(4.99421, -0.019696, s, m)} ${scaled_point(4.994948, -0.000001, s, m)} ${scaled_point(4.991121, 0.045528, s, m)}
      			${scaled_point(4.981474, 0.081205, s, m)} ${scaled_point(4.976286, 0.090132, s, m)} ${scaled_point(4.958226, 0.104585, s, m)} ${scaled_point(4.919687, 0.130747, s, m)} ${scaled_point(4.865083, 0.165779, s, m)}
      			${scaled_point(4.798826, 0.206841, s, m)} ${scaled_point(4.736702, 0.244327, s, m)} ${scaled_point(4.51578, 0.376036, s, m)} ${scaled_point(4.507041, 0.439796, s, m)} ${scaled_point(4.504132, 0.460832, s, m)}
      			${scaled_point(4.503477, 0.478466, s, m)} ${scaled_point(4.507449, 0.495539, s, m)} ${scaled_point(4.518416, 0.514894, s, m)} ${scaled_point(4.538752, 0.539371, s, m)} ${scaled_point(4.570825, 0.571813, s, m)}
      			${scaled_point(4.617008, 0.615061, s, m)} ${scaled_point(4.679671, 0.671957, s, m)} ${scaled_point(4.761185, 0.745343, s, m)} ${scaled_point(4.764301, 0.748148, s, m)} ${scaled_point(4.830399, 0.810725, s, m)}
      			${scaled_point(4.874928, 0.861349, s, m)} ${scaled_point(4.900254, 0.904142, s, m)} ${scaled_point(4.908738, 0.943229, s, m)} ${scaled_point(4.902747, 0.982733, s, m)} ${scaled_point(4.901342, 0.987172, s, m)}
      			${scaled_point(4.883271, 1.026769, s, m)} ${scaled_point(4.861425, 1.056429, s, m)} ${scaled_point(4.861063, 1.05676, s, m)} ${scaled_point(4.839638, 1.068871, s, m)} ${scaled_point(4.796022, 1.088202, s, m)}
      			${scaled_point(4.735316, 1.112675, s, m)} ${scaled_point(4.662618, 1.140214, s, m)} ${scaled_point(4.605731, 1.160768, s, m)} ${scaled_point(4.528618, 1.188548, s, m)} ${scaled_point(4.460768, 1.213888, s, m)}
      			${scaled_point(4.406977, 1.234925, s, m)} ${scaled_point(4.372045, 1.249796, s, m)} ${scaled_point(4.361115, 1.255773, s, m)} ${scaled_point(4.348269, 1.277418, s, m)} ${scaled_point(4.33395, 1.314344, s, m)}
      			${scaled_point(4.330801, 1.324463, s, m)} ${scaled_point(4.314456, 1.379818, s, m)} ${scaled_point(4.443756, 1.551231, s, m)} ${scaled_point(4.505225, 1.633144, s, m)} ${scaled_point(4.55126, 1.695982, s, m)}
      			${scaled_point(4.584072, 1.743474, s, m)} ${scaled_point(4.605866, 1.779351, s, m)} ${scaled_point(4.618852, 1.807341, s, m)} ${scaled_point(4.625237, 1.831174, s, m)} ${scaled_point(4.627229, 1.85458, s, m)}
      			${scaled_point(4.627301, 1.86125, s, m)} ${scaled_point(4.617241, 1.912581, s, m)} ${scaled_point(4.591262, 1.959073, s, m)} ${scaled_point(4.555821, 1.990329, s, m)} ${scaled_point(4.54409, 1.995247, s, m)}
      			${scaled_point(4.524505, 1.999167, s, m)} ${scaled_point(4.482324, 2.006426, s, m)} ${scaled_point(4.423354, 2.016116, s, m)} ${scaled_point(4.353402, 2.027329, s, m)} ${scaled_point(4.278275, 2.039156, s, m)}
      			${scaled_point(4.20378, 2.05069, s, m)} ${scaled_point(4.135725, 2.061021, s, m)} ${scaled_point(4.079916, 2.069242, s, m)} ${scaled_point(4.042161, 2.074444, s, m)} ${scaled_point(4.028912, 2.075822, s, m)}
      			${scaled_point(4.019155, 2.087422, s, m)} ${scaled_point(4.001898, 2.11675, s, m)} ${scaled_point(3.992883, 2.13386, s, m)} ${scaled_point(3.963274, 2.191898, s, m)} ${scaled_point(4.071875, 2.423581, s, m)}
      			${scaled_point(4.116942, 2.521729, s, m)} ${scaled_point(4.149244, 2.598261, s, m)} ${scaled_point(4.16947, 2.657057, s, m)} ${scaled_point(4.178309, 2.701999, s, m)} ${scaled_point(4.176452, 2.736969, s, m)}
      			${scaled_point(4.164587, 2.765849, s, m)} ${scaled_point(4.143405, 2.792519, s, m)} ${scaled_point(4.138338, 2.797703, s, m)} ${scaled_point(4.118261, 2.816615, s, m)} ${scaled_point(4.099122, 2.828749, s, m)}
      			${scaled_point(4.074222, 2.83554, s, m)} ${scaled_point(4.036866, 2.838421, s, m)} ${scaled_point(3.980356, 2.838826, s, m)} ${scaled_point(3.947334, 2.838585, s, m)} ${scaled_point(3.865138, 2.836922, s, m)}
      			${scaled_point(3.775331, 2.833582, s, m)} ${scaled_point(3.693392, 2.82918, s, m)} ${scaled_point(3.669168, 2.827483, s, m)} ${scaled_point(3.539868, 2.817637, s, m)} ${scaled_point(3.500209, 2.861173, s, m)}
      			${scaled_point(3.474821, 2.894111, s, m)} ${scaled_point(3.460965, 2.92192, s, m)} ${scaled_point(3.460127, 2.927099, s, m)} ${scaled_point(3.4634, 2.94814, s, m)} ${scaled_point(3.472716, 2.991831, s, m)}
      			${scaled_point(3.486872, 3.052917, s, m)} ${scaled_point(3.504662, 3.126143, s, m)} ${scaled_point(3.517366, 3.176822, s, m)} ${scaled_point(3.537054, 3.257057, s, m)} ${scaled_point(3.553851, 3.330502, s, m)}
      			${scaled_point(3.566509, 3.391287, s, m)} ${scaled_point(3.573775, 3.433546, s, m)} ${scaled_point(3.575028, 3.447454, s, m)} ${scaled_point(3.562497, 3.493303, s, m)} ${scaled_point(3.530614, 3.535601, s, m)}
      			${scaled_point(3.487947, 3.565639, s, m)} ${scaled_point(3.44954, 3.575028, s, m)} ${scaled_point(3.421665, 3.571497, s, m)} ${scaled_point(3.371824, 3.56176, s, m)} ${scaled_point(3.305892, 3.547093, s, m)}
      			${scaled_point(3.229746, 3.528776, s, m)} ${scaled_point(3.185349, 3.517533, s, m)} ${scaled_point(3.107286, 3.497872, s, m)} ${scaled_point(3.03739, 3.481137, s, m)} ${scaled_point(2.98116, 3.468579, s, m)}
      			${scaled_point(2.944097, 3.46145, s, m)} ${scaled_point(2.933541, 3.460294, s, m)} ${scaled_point(2.90474, 3.46978, s, m)} ${scaled_point(2.869578, 3.492969, s, m)} ${scaled_point(2.861455, 3.499957, s, m)}
      			${scaled_point(2.8182, 3.539365, s, m)} ${scaled_point(2.827575, 3.683332, s, m)} ${scaled_point(2.832112, 3.766019, s, m)} ${scaled_point(2.835841, 3.857854, s, m)} ${scaled_point(2.838113, 3.942174, s, m)}
      			${scaled_point(2.838396, 3.961749, s, m)} ${scaled_point(2.838632, 4.025234, s, m)} ${scaled_point(2.836577, 4.067152, s, m)} ${scaled_point(2.83056, 4.094762, s, m)} ${scaled_point(2.818907, 4.115322, s, m)}
      			${scaled_point(2.799945, 4.136091, s, m)} ${scaled_point(2.797703, 4.138338, s, m)} ${scaled_point(2.771012, 4.161228, s, m)} ${scaled_point(2.742856, 4.174932, s, m)} ${scaled_point(2.709354, 4.17876, s, m)}
      			${scaled_point(2.666624, 4.172025, s, m)} ${scaled_point(2.610784, 4.154035, s, m)} ${scaled_point(2.537952, 4.124101, s, m)} ${scaled_point(2.444248, 4.081534, s, m)} ${scaled_point(2.423581, 4.071875, s, m)}
      			${scaled_point(2.191898, 3.963274, s, m)} ${scaled_point(2.13386, 3.992883, s, m)} ${scaled_point(2.099151, 4.011873, s, m)} ${scaled_point(2.078412, 4.025698, s, m)} ${scaled_point(2.075822, 4.028912, s, m)}
      			${scaled_point(2.073651, 4.048274, s, m)} ${scaled_point(2.067743, 4.090283, s, m)} ${scaled_point(2.059006, 4.149131, s, m)} ${scaled_point(2.048348, 4.219013, s, m)} ${scaled_point(2.036678, 4.29412, s, m)}
      			${scaled_point(2.024904, 4.368646, s, m)} ${scaled_point(2.013935, 4.436782, s, m)} ${scaled_point(2.004678, 4.492723, s, m)} ${scaled_point(1.998042, 4.53066, s, m)} ${scaled_point(1.995247, 4.54409, s, m)}
      			${scaled_point(1.970724, 4.581135, s, m)} ${scaled_point(1.927786, 4.610691, s, m)} ${scaled_point(1.876831, 4.626302, s, m)} ${scaled_point(1.86125, 4.627301, s, m)} ${scaled_point(1.837327, 4.626109, s, m)}
      			${scaled_point(1.813974, 4.621116, s, m)} ${scaled_point(1.787462, 4.610114, s, m)} ${scaled_point(1.754062, 4.590894, s, m)} ${scaled_point(1.710044, 4.561248, s, m)} ${scaled_point(1.651679, 4.518968, s, m)}
      			${scaled_point(1.575238, 4.461847, s, m)} ${scaled_point(1.551231, 4.443756, s, m)} ${scaled_point(1.379818, 4.314456, s, m)} ${scaled_point(1.324463, 4.330801, s, m)} ${scaled_point(1.285698, 4.344614, s, m)}
      			${scaled_point(1.259053, 4.358352, s, m)} ${scaled_point(1.255773, 4.361115, s, m)} ${scaled_point(1.246738, 4.378793, s, m)} ${scaled_point(1.230141, 4.41892, s, m)} ${scaled_point(1.207847, 4.476698, s, m)}
      			${scaled_point(1.181717, 4.54733, s, m)} ${scaled_point(1.160768, 4.605731, s, m)} ${scaled_point(1.132308, 4.683903, s, m)} ${scaled_point(1.105419, 4.753755, s, m)} ${scaled_point(1.082177, 4.810187, s, m)}
      			${scaled_point(1.06466, 4.848099, s, m)} ${scaled_point(1.05676, 4.861063, s, m)} ${scaled_point(1.009947, 4.893842, s, m)} ${scaled_point(0.952692, 4.907384, s, m)} ${scaled_point(0.897243, 4.898858, s, m)}
      			${scaled_point(0.895851, 4.89828, s, m)} ${scaled_point(0.871829, 4.881623, s, m)} ${scaled_point(0.832998, 4.847212, s, m)} ${scaled_point(0.783486, 4.799033, s, m)} ${scaled_point(0.727424, 4.74107, s, m)}
      			${scaled_point(0.68234, 4.692224, s, m)} ${scaled_point(0.618449, 4.623242, s, m)} ${scaled_point(0.564183, 4.568011, s, m)} ${scaled_point(0.522057, 4.528932, s, m)} ${scaled_point(0.494587, 4.508406, s, m)}
      			${scaled_point(0.487095, 4.505853, s, m)} ${scaled_point(0.449132, 4.507308, s, m)} ${scaled_point(0.420097, 4.510425, s, m)} ${scaled_point(0.396455, 4.518556, s, m)} ${scaled_point(0.374671, 4.53505, s, m)}
      			${scaled_point(0.351209, 4.563258, s, m)} ${scaled_point(0.322533, 4.60653, s, m)} ${scaled_point(0.285107, 4.668216, s, m)} ${scaled_point(0.245445, 4.734827, s, m)} ${scaled_point(0.201484, 4.807641, s, m)}
      			${scaled_point(0.161346, 4.872402, s, m)} ${scaled_point(0.127804, 4.924771, s, m)} ${scaled_point(0.103631, 4.960406, s, m)} ${scaled_point(0.09234, 4.974453, s, m)} ${scaled_point(0.05602, 4.990862, s, m)}
      			${scaled_point(0.006168, 4.998034, s, m)} ${scaled_point(-0.043846, 4.995371, s, m)} ${scaled_point(-0.080648, 4.982274, s, m)} ${scaled_point(-0.080747, 4.982203, s, m)} ${scaled_point(-0.097773, 4.963014, s, m)}
      			${scaled_point(-0.12624, 4.923367, s, m)} ${scaled_point(-0.163151, 4.867755, s, m)} ${scaled_point(-0.205508, 4.800676, s, m)} ${scaled_point(-0.243538, 4.738028, s, m)} ${scaled_point(-0.376037, 4.51578, s, m)}
      			${scaled_point(-0.439798, 4.507041, s, m)} ${scaled_point(-0.460834, 4.504132, s, m)} ${scaled_point(-0.478468, 4.503477, s, m)} ${scaled_point(-0.495541, 4.507449, s, m)} ${scaled_point(-0.514895, 4.518416, s, m)}
      			${scaled_point(-0.539373, 4.538752, s, m)} ${scaled_point(-0.571814, 4.570825, s, m)} ${scaled_point(-0.615062, 4.617008, s, m)} ${scaled_point(-0.671958, 4.679671, s, m)} ${scaled_point(-0.745344, 4.761185, s, m)}
      			${scaled_point(-0.74815, 4.764301, s, m)} ${scaled_point(-0.810727, 4.830399, s, m)} ${scaled_point(-0.86135, 4.874928, s, m)} ${scaled_point(-0.904144, 4.900254, s, m)} ${scaled_point(-0.943231, 4.908738, s, m)}
      			${scaled_point(-0.982735, 4.902747, s, m)} ${scaled_point(-0.987174, 4.901342, s, m)} ${scaled_point(-1.026711, 4.883279, s, m)} ${scaled_point(-1.056262, 4.861441, s, m)} ${scaled_point(-1.056606, 4.861063, s, m)}
      			${scaled_point(-1.068692, 4.839652, s, m)} ${scaled_point(-1.088063, 4.796069, s, m)} ${scaled_point(-1.112633, 4.735405, s, m)} ${scaled_point(-1.14032, 4.662753, s, m)} ${scaled_point(-1.161067, 4.605731, s, m)}
      			${scaled_point(-1.189011, 4.528654, s, m)} ${scaled_point(-1.214444, 4.460827, s, m)} ${scaled_point(-1.235503, 4.407043, s, m)} ${scaled_point(-1.250324, 4.372091, s, m)} ${scaled_point(-1.256229, 4.361115, s, m)}
      			${scaled_point(-1.277642, 4.348185, s, m)} ${scaled_point(-1.314215, 4.33396, s, m)} ${scaled_point(-1.323098, 4.331204, s, m)} ${scaled_point(-1.377087, 4.315263, s, m)} ${scaled_point(-1.585905, 4.470764, s, m)}
      			${scaled_point(-1.662204, 4.527104, s, m)} ${scaled_point(-1.719812, 4.568129, s, m)} ${scaled_point(-1.762807, 4.59621, s, m)} ${scaled_point(-1.795265, 4.61372, s, m)} ${scaled_point(-1.821263, 4.623033, s, m)}
      			${scaled_point(-1.844877, 4.626519, s, m)} ${scaled_point(-1.854044, 4.62681, s, m)} ${scaled_point(-1.910904, 4.617367, s, m)} ${scaled_point(-1.959634, 4.591502, s, m)} ${scaled_point(-1.991195, 4.554506, s, m)}
      			${scaled_point(-1.995359, 4.54409, s, m)} ${scaled_point(-1.99939, 4.524218, s, m)} ${scaled_point(-2.00675, 4.481755, s, m)} ${scaled_point(-2.016522, 4.42254, s, m)} ${scaled_point(-2.027793, 4.352414, s, m)}
      			${scaled_point(-2.039647, 4.277217, s, m)} ${scaled_point(-2.051171, 4.202791, s, m)} ${scaled_point(-2.061449, 4.134974, s, m)} ${scaled_point(-2.069567, 4.079609, s, m)} ${scaled_point(-2.07461, 4.042535, s, m)}
      			${scaled_point(-2.075824, 4.030314, s, m)} ${scaled_point(-2.087441, 4.019684, s, m)} ${scaled_point(-2.116772, 4.001932, s, m)} ${scaled_point(-2.133245, 3.993198, s, m)} ${scaled_point(-2.190667, 3.963903, s, m)}
      			${scaled_point(-2.422373, 4.07219, s, m)} ${scaled_point(-2.520587, 4.117167, s, m)} ${scaled_point(-2.597181, 4.14942, s, m)} ${scaled_point(-2.656066, 4.169613, s, m)} ${scaled_point(-2.701153, 4.178413, s, m)}
      			${scaled_point(-2.736354, 4.176484, s, m)} ${scaled_point(-2.765582, 4.164493, s, m)} ${scaled_point(-2.792747, 4.143106, s, m)} ${scaled_point(-2.799656, 4.136387, s, m)} ${scaled_point(-2.843745, 4.092298, s, m)}
      			${scaled_point(-2.833295, 3.81778, s, m)} ${scaled_point(-2.822844, 3.543262, s, m)} ${scaled_point(-2.862871, 3.501483, s, m)} ${scaled_point(-2.893013, 3.47478, s, m)} ${scaled_point(-2.918046, 3.460468, s, m)}
      			${scaled_point(-2.92251, 3.459704, s, m)} ${scaled_point(-2.942444, 3.462975, s, m)} ${scaled_point(-2.985346, 3.472037, s, m)} ${scaled_point(-3.046195, 3.485764, s, m)} ${scaled_point(-3.119971, 3.503029, s, m)}
      			${scaled_point(-3.182895, 3.518138, s, m)} ${scaled_point(-3.286155, 3.542284, s, m)} ${scaled_point(-3.365785, 3.558247, s, m)} ${scaled_point(-3.425787, 3.566072, s, m)} ${scaled_point(-3.470165, 3.565803, s, m)}
      			${scaled_point(-3.502921, 3.557481, s, m)} ${scaled_point(-3.528057, 3.541153, s, m)} ${scaled_point(-3.545574, 3.522093, s, m)} ${scaled_point(-3.560066, 3.500968, s, m)} ${scaled_point(-3.569068, 3.478235, s, m)}
      			${scaled_point(-3.572223, 3.449578, s, m)} ${scaled_point(-3.569171, 3.41068, s, m)} ${scaled_point(-3.559556, 3.357224, s, m)} ${scaled_point(-3.543019, 3.284891, s, m)} ${scaled_point(-3.5192, 3.189367, s, m)}
      			${scaled_point(-3.517367, 3.182157, s, m)} ${scaled_point(-3.497802, 3.10369, s, m)} ${scaled_point(-3.496861, 3.099748, s, m)} ${scaled_point(-2.5219, 3.099748, s, m)} ${scaled_point(-2.505025, 3.176143, s, m)}
      			${scaled_point(-2.496768, 3.194107, s, m)} ${scaled_point(-2.455041, 3.257302, s, m)} ${scaled_point(-2.403126, 3.309708, s, m)} ${scaled_point(-2.349717, 3.34264, s, m)} ${scaled_point(-2.290644, 3.355737, s, m)}
      			${scaled_point(-2.219706, 3.356908, s, m)} ${scaled_point(-2.150882, 3.346794, s, m)} ${scaled_point(-2.107684, 3.331499, s, m)} ${scaled_point(-2.036784, 3.281811, s, m)} ${scaled_point(-1.989392, 3.216468, s, m)}
      			${scaled_point(-1.964725, 3.134096, s, m)} ${scaled_point(-1.9605, 3.073335, s, m)} ${scaled_point(-1.967953, 3.000889, s, m)} ${scaled_point(-1.992967, 2.940362, s, m)} ${scaled_point(-2.039523, 2.884202, s, m)}
      			${scaled_point(-2.077822, 2.850769, s, m)} ${scaled_point(-2.146251, 2.813197, s, m)} ${scaled_point(-2.225056, 2.798208, s, m)} ${scaled_point(-2.305915, 2.806439, s, m)} ${scaled_point(-2.364133, 2.828887, s, m)}
      			${scaled_point(-2.433181, 2.879877, s, m)} ${scaled_point(-2.483886, 2.945857, s, m)} ${scaled_point(-2.514156, 3.021066, s, m)} ${scaled_point(-2.5219, 3.099748, s, m)} ${scaled_point(-3.496861, 3.099748, s, m)}
      			${scaled_point(-3.481081, 3.033653, s, m)} ${scaled_point(-3.468428, 2.977416, s, m)} ${scaled_point(-3.461071, 2.940354, s, m)} ${scaled_point(-3.459706, 2.929331, s, m)} ${scaled_point(-3.470877, 2.899912, s, m)}
      			${scaled_point(-3.498467, 2.866734, s, m)} ${scaled_point(-3.533586, 2.837747, s, m)} ${scaled_point(-3.567346, 2.820904, s, m)} ${scaled_point(-3.582237, 2.819719, s, m)} ${scaled_point(-3.605885, 2.822066, s, m)}
      			${scaled_point(-3.652839, 2.825147, s, m)} ${scaled_point(-3.71759, 2.828654, s, m)} ${scaled_point(-3.794632, 2.832283, s, m)} ${scaled_point(-3.851408, 2.834672, s, m)} ${scaled_point(-4.091749, 2.844294, s, m)}
      			${scaled_point(-4.136113, 2.79993, s, m)} ${scaled_point(-4.159975, 2.772427, s, m)} ${scaled_point(-4.17452, 2.743901, s, m)} ${scaled_point(-4.179083, 2.710435, s, m)} ${scaled_point(-4.172996, 2.668112, s, m)}
      			${scaled_point(-4.155592, 2.613015, s, m)} ${scaled_point(-4.126204, 2.541227, s, m)} ${scaled_point(-4.084166, 2.448831, s, m)} ${scaled_point(-4.071858, 2.422599, s, m)} ${scaled_point(-3.963238, 2.191972, s, m)}
      			${scaled_point(-3.992866, 2.133897, s, m)} ${scaled_point(-4.012161, 2.099145, s, m)} ${scaled_point(-4.026703, 2.078397, s, m)} ${scaled_point(-4.030316, 2.075822, s, m)} ${scaled_point(-4.050108, 2.073641, s, m)}
      			${scaled_point(-4.09251, 2.067709, s, m)} ${scaled_point(-4.151682, 2.058941, s, m)} ${scaled_point(-4.221783, 2.04825, s, m)} ${scaled_point(-4.296973, 2.036552, s, m)} ${scaled_point(-4.371411, 2.024761, s, m)}
      			${scaled_point(-4.439257, 2.013793, s, m)} ${scaled_point(-4.49467, 2.004561, s, m)} ${scaled_point(-4.53181, 1.997981, s, m)} ${scaled_point(-4.544091, 1.995358, s, m)} ${scaled_point(-4.58303, 1.969538, s, m)}
      			${scaled_point(-4.612202, 1.924279, s, m)} ${scaled_point(-4.626311, 1.868622, s, m)} ${scaled_point(-4.626863, 1.854043, s, m)} ${scaled_point(-4.625002, 1.830302, s, m)} ${scaled_point(-4.618244, 1.8058, s, m)}
      			${scaled_point(-4.604206, 1.77646, s, m)} ${scaled_point(-4.58051, 1.738204, s, m)} ${scaled_point(-4.544774, 1.686956, s, m)} ${scaled_point(-4.494618, 1.618639, s, m)} ${scaled_point(-4.470642, 1.586499, s, m)}
      			${scaled_point(-4.314913, 1.378276, s, m)} ${scaled_point(-4.33103, 1.323692, s, m)} ${scaled_point(-4.344793, 1.285305, s, m)} ${scaled_point(-4.358512, 1.259205, s, m)} ${scaled_point(-4.361116, 1.256227, s, m)}
      			${scaled_point(-4.37878, 1.247314, s, m)} ${scaled_point(-4.418873, 1.230764, s, m)} ${scaled_point(-4.476605, 1.20844, s, m)} ${scaled_point(-4.547185, 1.182207, s, m)} ${scaled_point(-4.605733, 1.161065, s, m)}
      			${scaled_point(-4.683872, 1.132424, s, m)} ${scaled_point(-4.753701, 1.105395, s, m)} ${scaled_point(-4.810125, 1.082062, s, m)} ${scaled_point(-4.848053, 1.064508, s, m)} ${scaled_point(-4.861064, 1.056604, s, m)}
      			${scaled_point(-4.882876, 1.027408, s, m)} ${scaled_point(-4.901103, 0.987895, s, m)} ${scaled_point(-4.901343, 0.987172, s, m)} ${scaled_point(-4.908749, 0.947378, s, m)} ${scaled_point(-4.901932, 0.908444, s, m)}
      			${scaled_point(-4.878528, 0.866246, s, m)} ${scaled_point(-4.836174, 0.816661, s, m)} ${scaled_point(-4.772506, 0.755566, s, m)} ${scaled_point(-4.764303, 0.748148, s, m)} ${scaled_point(-4.682109, 0.674155, s, m)}
      			${scaled_point(-4.618847, 0.616747, s, m)} ${scaled_point(-4.572146, 0.573083, s, m)} ${scaled_point(-4.539633, 0.540322, s, m)} ${scaled_point(-4.51894, 0.515622, s, m)} ${scaled_point(-4.507694, 0.496141, s, m)}
      			${scaled_point(-4.503524, 0.479037, s, m)} ${scaled_point(-4.504061, 0.461469, s, m)} ${scaled_point(-4.506933, 0.440594, s, m)} ${scaled_point(-4.507043, 0.439796, s, m)} ${scaled_point(-4.515782, 0.376036, s, m)}
      			${scaled_point(-4.738667, 0.243157, s, m)} ${scaled_point(-4.812134, 0.198239, s, m)} ${scaled_point(-4.877959, 0.155893, s, m)} ${scaled_point(-4.931639, 0.119182, s, m)} ${scaled_point(-4.96867, 0.091169, s, m)}
      			${scaled_point(-4.983712, 0.076457, s, m)} ${scaled_point(-4.996954, 0.036122, s, m)} ${scaled_point(-4.997999, -0.007209, s, m)} ${scaled_point(-3.654095, -0.007209, s, m)}
      			${scaled_point(-3.653374, 0.127244, s, m)} ${scaled_point(-3.651218, 0.238081, s, m)} ${scaled_point(-3.647371, 0.330496, s, m)} ${scaled_point(-3.641576, 0.40968, s, m)} ${scaled_point(-3.633575, 0.480825, s, m)}
      			${scaled_point(-3.628057, 0.518955, s, m)} ${scaled_point(-3.565097, 0.841149, s, m)} ${scaled_point(-3.478712, 1.147575, s, m)} ${scaled_point(-3.368082, 1.440361, s, m)} ${scaled_point(-3.232385, 1.721632, s, m)}
      			${scaled_point(-3.070803, 1.993517, s, m)} ${scaled_point(-3.043647, 2.034568, s, m)} ${scaled_point(-2.983344, 2.121657, s, m)} ${scaled_point(-2.920562, 2.207299, s, m)} ${scaled_point(-2.857978, 2.28831, s, m)}
      			${scaled_point(-2.79827, 2.36151, s, m)} ${scaled_point(-2.744116, 2.423716, s, m)} ${scaled_point(-2.698192, 2.471745, s, m)} ${scaled_point(-2.663176, 2.502415, s, m)} ${scaled_point(-2.641746, 2.512544, s, m)}
      			${scaled_point(-2.641522, 2.512521, s, m)} ${scaled_point(-2.620648, 2.509519, s, m)} ${scaled_point(-2.575581, 2.502694, s, m)} ${scaled_point(-2.510607, 2.492704, s, m)} ${scaled_point(-2.430013, 2.480213, s, m)}
      			${scaled_point(-2.338085, 2.465881, s, m)} ${scaled_point(-2.27525, 2.456041, s, m)} ${scaled_point(-1.934097, 2.402533, s, m)} ${scaled_point(-1.86441, 2.428879, s, m)} ${scaled_point(-1.78678, 2.47141, s, m)}
      			${scaled_point(-1.727388, 2.531387, s, m)} ${scaled_point(-1.69082, 2.604045, s, m)} ${scaled_point(-1.688701, 2.611432, s, m)} ${scaled_point(-1.681109, 2.645544, s, m)} ${scaled_point(-1.670218, 2.702377, s, m)}
      			${scaled_point(-1.657059, 2.776148, s, m)} ${scaled_point(-1.642665, 2.861074, s, m)} ${scaled_point(-1.628608, 2.947956, s, m)} ${scaled_point(-1.614592, 3.036618, s, m)} ${scaled_point(-1.601659, 3.118273, s, m)}
      			${scaled_point(-1.590662, 3.187554, s, m)} ${scaled_point(-1.582453, 3.239094, s, m)} ${scaled_point(-1.577883, 3.267524, s, m)} ${scaled_point(-1.577882, 3.267531, s, m)} ${scaled_point(-1.57291, 3.287911, s, m)}
      			${scaled_point(-1.562468, 3.304439, s, m)} ${scaled_point(-1.541797, 3.320362, s, m)} ${scaled_point(-1.506142, 3.33893, s, m)} ${scaled_point(-1.450744, 3.363388, s, m)} ${scaled_point(-1.415884, 3.378115, s, m)}
      			${scaled_point(-1.260832, 3.439909, s, m)} ${scaled_point(-1.111042, 3.492151, s, m)} ${scaled_point(-0.960429, 3.536359, s, m)} ${scaled_point(-0.802909, 3.574053, s, m)} ${scaled_point(-0.632401, 3.606753, s, m)}
      			${scaled_point(-0.442821, 3.635977, s, m)} ${scaled_point(-0.31714, 3.652505, s, m)} ${scaled_point(-0.269343, 3.655834, s, m)} ${scaled_point(-0.19836, 3.657373, s, m)} ${scaled_point(-0.10977, 3.657295, s, m)}
      			${scaled_point(-0.009154, 3.655774, s, m)} ${scaled_point(0.097911, 3.65298, s, m)} ${scaled_point(0.205845, 3.649088, s, m)} ${scaled_point(0.30907, 3.64427, s, m)} ${scaled_point(0.402007, 3.638698, s, m)}
      			${scaled_point(0.479076, 3.632546, s, m)} ${scaled_point(0.53337, 3.626189, s, m)} ${scaled_point(0.661568, 3.603419, s, m)} ${scaled_point(0.802558, 3.572957, s, m)} ${scaled_point(0.946836, 3.537213, s, m)}
      			${scaled_point(1.084895, 3.498593, s, m)} ${scaled_point(1.207229, 3.459508, s, m)} ${scaled_point(1.246005, 3.445633, s, m)} ${scaled_point(1.338116, 3.41058, s, m)} ${scaled_point(1.419791, 3.377794, s, m)}
      			${scaled_point(1.487419, 3.34886, s, m)} ${scaled_point(1.537389, 3.325363, s, m)} ${scaled_point(1.566093, 3.308885, s, m)} ${scaled_point(1.571634, 3.302769, s, m)} ${scaled_point(1.575062, 3.268995, s, m)}
      			${scaled_point(1.583036, 3.213639, s, m)} ${scaled_point(1.594643, 3.141645, s, m)} ${scaled_point(1.601513, 3.101508, s, m)} ${scaled_point(1.959294, 3.101508, s, m)} ${scaled_point(1.975371, 3.178899, s, m)}
      			${scaled_point(2.007047, 3.247242, s, m)} ${scaled_point(2.041853, 3.288518, s, m)} ${scaled_point(2.110846, 3.331386, s, m)} ${scaled_point(2.192905, 3.355327, s, m)} ${scaled_point(2.277927, 3.358514, s, m)}
      			${scaled_point(2.345173, 3.343463, s, m)} ${scaled_point(2.405156, 3.307847, s, m)} ${scaled_point(2.459292, 3.252087, s, m)} ${scaled_point(2.495371, 3.193018, s, m)} ${scaled_point(2.518354, 3.113042, s, m)}
      			${scaled_point(2.516087, 3.034447, s, m)} ${scaled_point(2.492002, 2.961095, s, m)} ${scaled_point(2.449532, 2.896846, s, m)} ${scaled_point(2.392109, 2.84556, s, m)} ${scaled_point(2.323166, 2.811099, s, m)}
      			${scaled_point(2.246135, 2.797321, s, m)} ${scaled_point(2.164448, 2.808089, s, m)} ${scaled_point(2.15558, 2.810853, s, m)} ${scaled_point(2.095096, 2.841146, s, m)} ${scaled_point(2.036363, 2.887646, s, m)}
      			${scaled_point(1.990795, 2.940774, s, m)} ${scaled_point(1.98092, 2.957488, s, m)} ${scaled_point(1.960563, 3.024546, s, m)} ${scaled_point(1.959294, 3.101508, s, m)} ${scaled_point(1.601513, 3.101508, s, m)}
      			${scaled_point(1.608968, 3.057959, s, m)} ${scaled_point(1.625097, 2.967527, s, m)} ${scaled_point(1.642115, 2.875295, s, m)} ${scaled_point(1.659109, 2.786207, s, m)} ${scaled_point(1.675163, 2.70521, s, m)}
      			${scaled_point(1.689365, 2.637249, s, m)} ${scaled_point(1.700799, 2.58727, s, m)} ${scaled_point(1.708552, 2.560217, s, m)} ${scaled_point(1.709169, 2.558792, s, m)} ${scaled_point(1.743958, 2.510877, s, m)}
      			${scaled_point(1.797181, 2.465648, s, m)} ${scaled_point(1.858804, 2.430356, s, m)} ${scaled_point(1.910015, 2.413639, s, m)} ${scaled_point(1.937223, 2.413372, s, m)} ${scaled_point(1.988192, 2.41738, s, m)}
      			${scaled_point(2.058258, 2.425122, s, m)} ${scaled_point(2.142756, 2.436061, s, m)} ${scaled_point(2.23702, 2.449657, s, m)} ${scaled_point(2.282725, 2.45671, s, m)} ${scaled_point(2.378191, 2.471534, s, m)}
      			${scaled_point(2.465552, 2.484692, s, m)} ${scaled_point(2.540294, 2.495537, s, m)} ${scaled_point(2.597904, 2.503423, s, m)} ${scaled_point(2.63387, 2.507701, s, m)} ${scaled_point(2.642435, 2.508285, s, m)}
      			${scaled_point(2.668099, 2.498459, s, m)} ${scaled_point(2.7047, 2.46787, s, m)} ${scaled_point(2.754149, 2.414853, s, m)} ${scaled_point(2.768013, 2.398756, s, m)} ${scaled_point(2.97357, 2.136454, s, m)}
      			${scaled_point(3.152275, 1.863803, s, m)} ${scaled_point(3.30443, 1.580142, s, m)} ${scaled_point(3.430337, 1.28481, s, m)} ${scaled_point(3.5303, 0.977148, s, m)} ${scaled_point(3.604619, 0.656495, s, m)}
      			${scaled_point(3.62808, 0.518955, s, m)} ${scaled_point(3.635703, 0.453684, s, m)} ${scaled_point(3.642202, 0.367912, s, m)} ${scaled_point(3.647488, 0.267082, s, m)} ${scaled_point(3.651475, 0.156633, s, m)}
      			${scaled_point(3.654076, 0.042007, s, m)} ${scaled_point(3.655203, -0.071356, s, m)} ${scaled_point(3.65477, -0.178014, s, m)} ${scaled_point(3.65269, -0.272526, s, m)} ${scaled_point(3.648874, -0.349451, s, m)}
      			${scaled_point(3.643237, -0.403348, s, m)} ${scaled_point(3.642874, -0.40553, s, m)} ${scaled_point(3.631435, -0.472297, s, m)} ${scaled_point(3.325734, -0.627175, s, m)} ${scaled_point(3.236954, -0.672853, s, m)}
      			${scaled_point(3.154712, -0.716481, s, m)} ${scaled_point(3.083239, -0.75571, s, m)} ${scaled_point(3.026764, -0.788193, s, m)} ${scaled_point(2.989517, -0.81158, s, m)} ${scaled_point(2.978573, -0.819886, s, m)}
      			${scaled_point(2.928478, -0.88276, s, m)} ${scaled_point(2.894953, -0.959972, s, m)} ${scaled_point(2.883403, -1.034535, s, m)} ${scaled_point(2.885524, -1.058569, s, m)} ${scaled_point(2.89305, -1.088794, s, m)}
      			${scaled_point(2.907384, -1.128514, s, m)} ${scaled_point(2.927195, -1.174663, s, m)} ${scaled_point(3.340262, -1.174663, s, m)} ${scaled_point(3.349677, -1.097509, s, m)} ${scaled_point(3.38032, -1.030437, s, m)}
      			${scaled_point(3.432983, -0.968159, s, m)} ${scaled_point(3.497381, -0.923063, s, m)} ${scaled_point(3.57276, -0.898453, s, m)} ${scaled_point(3.650682, -0.895814, s, m)} ${scaled_point(3.72271, -0.91663, s, m)}
      			${scaled_point(3.723502, -0.917027, s, m)} ${scaled_point(3.80202, -0.970034, s, m)} ${scaled_point(3.858055, -1.036291, s, m)} ${scaled_point(3.890316, -1.111817, s, m)} ${scaled_point(3.897513, -1.192628, s, m)}
      			${scaled_point(3.878356, -1.274743, s, m)} ${scaled_point(3.854584, -1.321523, s, m)} ${scaled_point(3.798997, -1.388136, s, m)} ${scaled_point(3.732617, -1.431561, s, m)} ${scaled_point(3.65991, -1.453073, s, m)}
      			${scaled_point(3.585339, -1.453946, s, m)} ${scaled_point(3.51337, -1.435456, s, m)} ${scaled_point(3.448466, -1.398876, s, m)} ${scaled_point(3.395094, -1.345483, s, m)} ${scaled_point(3.357716, -1.27655, s, m)}
      			${scaled_point(3.340798, -1.193353, s, m)} ${scaled_point(3.340262, -1.174663, s, m)} ${scaled_point(2.927195, -1.174663, s, m)} ${scaled_point(2.929929, -1.181033, s, m)} ${scaled_point(2.962088, -1.249657, s, m)}
      			${scaled_point(3.005265, -1.33769, s, m)} ${scaled_point(3.05007, -1.427063, s, m)} ${scaled_point(3.217053, -1.7581, s, m)} ${scaled_point(3.135058, -1.89551, s, m)} ${scaled_point(2.966415, -2.150685, s, m)}
      			${scaled_point(2.773568, -2.39285, s, m)} ${scaled_point(2.559124, -2.619588, s, m)} ${scaled_point(2.32569, -2.828487, s, m)} ${scaled_point(2.075875, -3.017131, s, m)} ${scaled_point(1.812285, -3.183107, s, m)}
      			${scaled_point(1.650567, -3.269823, s, m)} ${scaled_point(1.451933, -3.363638, s, m)} ${scaled_point(1.259254, -3.441521, s, m)} ${scaled_point(1.063125, -3.506706, s, m)} ${scaled_point(0.854145, -3.562429, s, m)}
      			${scaled_point(0.702511, -3.596029, s, m)} ${scaled_point(0.683991, -3.588611, s, m)} ${scaled_point(0.648515, -3.561797, s, m)} ${scaled_point(0.595519, -3.515087, s, m)} ${scaled_point(0.524437, -3.44798, s, m)}
      			${scaled_point(0.434701, -3.359974, s, m)} ${scaled_point(0.425716, -3.351036, s, m)} ${scaled_point(0.353496, -3.280013, s, m)} ${scaled_point(0.285417, -3.214716, s, m)} ${scaled_point(0.224923, -3.15832, s, m)}
      			${scaled_point(0.175457, -3.113999, s, m)} ${scaled_point(0.140465, -3.084928, s, m)} ${scaled_point(0.126836, -3.075564, s, m)} ${scaled_point(0.073396, -3.058016, s, m)} ${scaled_point(0.007156, -3.05096, s, m)}
      			${scaled_point(-0.05937, -3.054569, s, m)} ${scaled_point(-0.113665, -3.069017, s, m)} ${scaled_point(-0.120015, -3.072148, s, m)} ${scaled_point(-0.14129, -3.088162, s, m)}
      			${scaled_point(-0.179562, -3.121597, s, m)} ${scaled_point(-0.231539, -3.169388, s, m)} ${scaled_point(-0.293931, -3.228471, s, m)} ${scaled_point(-0.363446, -3.295782, s, m)}
      			${scaled_point(-0.418568, -3.35011, s, m)} ${scaled_point(-0.50605, -3.436162, s, m)} ${scaled_point(-0.575467, -3.50249, s, m)} ${scaled_point(-0.628394, -3.550478, s, m)}
      			${scaled_point(-0.666406, -3.581507, s, m)} ${scaled_point(-0.691077, -3.596961, s, m)} ${scaled_point(-0.702185, -3.599063, s, m)} ${scaled_point(-0.730368, -3.592141, s, m)}
      			${scaled_point(-0.77495, -3.582016, s, m)} ${scaled_point(-0.807265, -3.57497, s, m)} ${scaled_point(-0.884577, -3.556232, s, m)} ${scaled_point(-0.97977, -3.529891, s, m)}
      			${scaled_point(-1.083828, -3.498731, s, m)} ${scaled_point(-1.187738, -3.465535, s, m)} ${scaled_point(-1.282485, -3.433087, s, m)} ${scaled_point(-1.35461, -3.405966, s, m)}
      			${scaled_point(-1.641562, -3.275615, s, m)} ${scaled_point(-1.91708, -3.120469, s, m)} ${scaled_point(-2.178962, -2.942411, s, m)} ${scaled_point(-2.425008, -2.743327, s, m)}
      			${scaled_point(-2.653017, -2.525099, s, m)} ${scaled_point(-2.860788, -2.289612, s, m)} ${scaled_point(-3.046119, -2.038749, s, m)} ${scaled_point(-3.155837, -1.864376, s, m)}
      			${scaled_point(-3.216527, -1.761045, s, m)} ${scaled_point(-3.049807, -1.427776, s, m)} ${scaled_point(-2.993923, -1.315162, s, m)} ${scaled_point(-2.950503, -1.224502, s, m)}
      			${scaled_point(-2.918621, -1.152218, s, m)} ${scaled_point(-2.897352, -1.094732, s, m)} ${scaled_point(-2.88577, -1.048464, s, m)} ${scaled_point(-2.88295, -1.009837, s, m)}
      			${scaled_point(-2.887967, -0.975271, s, m)} ${scaled_point(-2.899895, -0.941187, s, m)} ${scaled_point(-2.915523, -0.90846, s, m)} ${scaled_point(-2.933056, -0.87767, s, m)}
      			${scaled_point(-2.954057, -0.849876, s, m)} ${scaled_point(-2.981722, -0.82291, s, m)} ${scaled_point(-3.019247, -0.794605, s, m)} ${scaled_point(-3.069829, -0.762793, s, m)}
      			${scaled_point(-3.136664, -0.725306, s, m)} ${scaled_point(-3.222949, -0.679977, s, m)} ${scaled_point(-3.331879, -0.624638, s, m)} ${scaled_point(-3.340301, -0.6204, s, m)}
      			${scaled_point(-3.434167, -0.573075, s, m)} ${scaled_point(-3.505503, -0.536502, s, m)} ${scaled_point(-3.557563, -0.508534, s, m)} ${scaled_point(-3.593601, -0.487025, s, m)}
      			${scaled_point(-3.61687, -0.469828, s, m)} ${scaled_point(-3.630626, -0.454796, s, m)} ${scaled_point(-3.638122, -0.439784, s, m)} ${scaled_point(-3.642613, -0.422644, s, m)}
      			${scaled_point(-3.643025, -0.420716, s, m)} ${scaled_point(-3.646152, -0.391736, s, m)} ${scaled_point(-3.648928, -0.338582, s, m)} ${scaled_point(-3.651229, -0.265909, s, m)}
      			${scaled_point(-3.652931, -0.178372, s, m)} ${scaled_point(-3.653909, -0.080628, s, m)} ${scaled_point(-3.654095, -0.007209, s, m)} ${scaled_point(-4.997999, -0.007209, s, m)}
      			${scaled_point(-4.99821, -0.015946, s, m)} ${scaled_point(-4.988291, -0.065646, s, m)} ${scaled_point(-4.973979, -0.092915, s, m)} ${scaled_point(-4.956711, -0.106435, s, m)}
      			${scaled_point(-4.918917, -0.131757, s, m)} ${scaled_point(-4.86495, -0.166102, s, m)} ${scaled_point(-4.799159, -0.206696, s, m)} ${scaled_point(-4.736703, -0.244329, s, m)}
      			${scaled_point(-4.515782, -0.376037, s, m)} ${scaled_point(-4.507043, -0.439798, s, m)} ${scaled_point(-4.504134, -0.460834, s, m)} ${scaled_point(-4.503479, -0.478468, s, m)}
      			${scaled_point(-4.50745, -0.495541, s, m)} ${scaled_point(-4.518418, -0.514895, s, m)} ${scaled_point(-4.538753, -0.539373, s, m)} ${scaled_point(-4.570827, -0.571814, s, m)}
      			${scaled_point(-4.61701, -0.615062, s, m)} ${scaled_point(-4.679673, -0.671958, s, m)} ${scaled_point(-4.761187, -0.745344, s, m)} ${scaled_point(-4.764303, -0.74815, s, m)}
      			${scaled_point(-4.830401, -0.810727, s, m)} ${scaled_point(-4.87493, -0.86135, s, m)} ${scaled_point(-4.900255, -0.904144, s, m)} ${scaled_point(-4.90874, -0.943231, s, m)}
      			${scaled_point(-4.902749, -0.982735, s, m)} ${scaled_point(-4.901343, -0.987174, s, m)} ${scaled_point(-4.883273, -1.026771, s, m)} ${scaled_point(-4.861427, -1.056431, s, m)}
      			${scaled_point(-4.861064, -1.056762, s, m)} ${scaled_point(-4.83964, -1.068873, s, m)} ${scaled_point(-4.796024, -1.088204, s, m)} ${scaled_point(-4.735317, -1.112677, s, m)}
      			${scaled_point(-4.66262, -1.140216, s, m)} ${scaled_point(-4.605733, -1.160769, s, m)} ${scaled_point(-4.52862, -1.18855, s, m)} ${scaled_point(-4.460769, -1.21389, s, m)} ${scaled_point(-4.406979, -1.234927, s, m)}
      			${scaled_point(-4.372047, -1.249797, s, m)} ${scaled_point(-4.361116, -1.255775, s, m)} ${scaled_point(-4.34827, -1.277419, s, m)} ${scaled_point(-4.333952, -1.314346, s, m)}
      			${scaled_point(-4.330802, -1.324465, s, m)} ${scaled_point(-4.314458, -1.37982, s, m)} ${scaled_point(-4.350683, -1.427843, s, m)} ${scaled_point(-3.76243, -1.427843, s, m)}
      			${scaled_point(-3.76243, -1.176417, s, m)} ${scaled_point(-3.76243, -0.924991, s, m)} ${scaled_point(-3.722787, -0.909743, s, m)} ${scaled_point(-3.657892, -0.896899, s, m)}
      			${scaled_point(-3.582999, -0.900108, s, m)} ${scaled_point(-3.510922, -0.917794, s, m)} ${scaled_point(-3.463415, -0.941642, s, m)} ${scaled_point(-3.398649, -1.002096, s, m)}
      			${scaled_point(-3.359087, -1.076433, s, m)} ${scaled_point(-3.344481, -1.165137, s, m)} ${scaled_point(-3.344382, -1.173792, s, m)} ${scaled_point(-3.356804, -1.26359, s, m)}
      			${scaled_point(-3.391934, -1.340049, s, m)} ${scaled_point(-3.44657, -1.399804, s, m)} ${scaled_point(-3.517511, -1.43949, s, m)} ${scaled_point(-3.601553, -1.455743, s, m)}
      			${scaled_point(-3.612952, -1.45596, s, m)} ${scaled_point(-3.664396, -1.453263, s, m)} ${scaled_point(-3.709576, -1.446412, s, m)} ${scaled_point(-3.725453, -1.441901, s, m)}
      			${scaled_point(-3.76243, -1.427843, s, m)} ${scaled_point(-4.350683, -1.427843, s, m)} ${scaled_point(-4.443758, -1.551233, s, m)} ${scaled_point(-4.505226, -1.633146, s, m)}
      			${scaled_point(-4.551262, -1.695984, s, m)} ${scaled_point(-4.584073, -1.743476, s, m)} ${scaled_point(-4.605868, -1.779353, s, m)} ${scaled_point(-4.618854, -1.807343, s, m)}
      			${scaled_point(-4.625239, -1.831176, s, m)} ${scaled_point(-4.627231, -1.854581, s, m)} ${scaled_point(-4.627302, -1.861252, s, m)} ${scaled_point(-4.617242, -1.912583, s, m)}
      			${scaled_point(-4.591263, -1.959075, s, m)} ${scaled_point(-4.555822, -1.99033, s, m)} ${scaled_point(-4.544091, -1.995249, s, m)} ${scaled_point(-4.524507, -1.999169, s, m)}
      			${scaled_point(-4.482326, -2.006428, s, m)} ${scaled_point(-4.423356, -2.016118, s, m)} ${scaled_point(-4.353404, -2.027331, s, m)} ${scaled_point(-4.278277, -2.039158, s, m)}
      			${scaled_point(-4.203782, -2.050691, s, m)} ${scaled_point(-4.135726, -2.061023, s, m)} ${scaled_point(-4.079918, -2.069243, s, m)} ${scaled_point(-4.042162, -2.074446, s, m)}
      			${scaled_point(-4.028913, -2.075824, s, m)} ${scaled_point(-4.019156, -2.087424, s, m)} ${scaled_point(-4.0019, -2.116752, s, m)} ${scaled_point(-3.992885, -2.133862, s, m)}
      			${scaled_point(-3.963276, -2.1919, s, m)} ${scaled_point(-4.071877, -2.423583, s, m)} ${scaled_point(-4.116944, -2.521731, s, m)} ${scaled_point(-4.149246, -2.598262, s, m)}
      			${scaled_point(-4.169471, -2.657058, s, m)} ${scaled_point(-4.178311, -2.702, s, m)} ${scaled_point(-4.176453, -2.736971, s, m)} ${scaled_point(-4.164589, -2.76585, s, m)} ${scaled_point(-4.143406, -2.792521, s, m)}
      			${scaled_point(-4.13834, -2.797705, s, m)} ${scaled_point(-4.118263, -2.816616, s, m)} ${scaled_point(-4.099124, -2.828751, s, m)} ${scaled_point(-4.074224, -2.835542, s, m)}
      			${scaled_point(-4.036868, -2.838423, s, m)} ${scaled_point(-3.980358, -2.838827, s, m)} ${scaled_point(-3.947336, -2.838587, s, m)} ${scaled_point(-3.865457, -2.83694, s, m)}
      			${scaled_point(-3.776271, -2.83364, s, m)} ${scaled_point(-3.695093, -2.829295, s, m)} ${scaled_point(-3.670821, -2.827595, s, m)} ${scaled_point(-3.543173, -2.817858, s, m)}
      			${scaled_point(-3.50144, -2.86539, s, m)} ${scaled_point(-3.475662, -2.89943, s, m)} ${scaled_point(-3.460992, -2.927873, s, m)} ${scaled_point(-3.459706, -2.934693, s, m)}
      			${scaled_point(-3.463092, -2.955496, s, m)} ${scaled_point(-3.472453, -2.999009, s, m)} ${scaled_point(-3.486592, -3.060019, s, m)} ${scaled_point(-3.50431, -3.133312, s, m)}
      			${scaled_point(-3.517367, -3.185812, s, m)} ${scaled_point(-3.536928, -3.265868, s, m)} ${scaled_point(-3.553647, -3.338589, s, m)} ${scaled_point(-3.566299, -3.3983, s, m)}
      			${scaled_point(-3.57366, -3.43933, s, m)} ${scaled_point(-3.575029, -3.452958, s, m)} ${scaled_point(-3.562458, -3.495068, s, m)} ${scaled_point(-3.530655, -3.535114, s, m)}
      			${scaled_point(-3.488491, -3.564582, s, m)} ${scaled_point(-3.447909, -3.575029, s, m)} ${scaled_point(-3.41949, -3.57151, s, m)} ${scaled_point(-3.369119, -3.561798, s, m)}
      			${scaled_point(-3.302692, -3.547166, s, m)} ${scaled_point(-3.226105, -3.528883, s, m)} ${scaled_point(-3.180369, -3.517367, s, m)} ${scaled_point(-3.102248, -3.497725, s, m)}
      			${scaled_point(-3.032543, -3.480955, s, m)} ${scaled_point(-2.976655, -3.4683, s, m)} ${scaled_point(-2.939985, -3.460999, s, m)} ${scaled_point(-2.929417, -3.459706, s, m)}
      			${scaled_point(-2.899958, -3.470874, s, m)} ${scaled_point(-2.866751, -3.498459, s, m)} ${scaled_point(-2.837748, -3.533576, s, m)} ${scaled_point(-2.820902, -3.567343, s, m)}
      			${scaled_point(-2.819721, -3.582237, s, m)} ${scaled_point(-2.822068, -3.605885, s, m)} ${scaled_point(-2.825148, -3.652839, s, m)} ${scaled_point(-2.828656, -3.71759, s, m)}
      			${scaled_point(-2.832285, -3.794632, s, m)} ${scaled_point(-2.832837, -3.807765, s, m)} ${scaled_point(-0.273332, -3.807765, s, m)} ${scaled_point(-0.270591, -3.739527, s, m)}
      			${scaled_point(-0.256128, -3.684104, s, m)} ${scaled_point(-0.253558, -3.678825, s, m)} ${scaled_point(-0.204423, -3.61337, s, m)} ${scaled_point(-0.136759, -3.562654, s, m)}
      			${scaled_point(-0.076347, -3.537904, s, m)} ${scaled_point(-0.03173, -3.525916, s, m)} ${scaled_point(-0.003525, -3.520487, s, m)} ${scaled_point(0.019941, -3.521668, s, m)}
      			${scaled_point(0.050342, -3.529511, s, m)} ${scaled_point(0.080665, -3.538596, s, m)} ${scaled_point(0.153586, -3.573494, s, m)} ${scaled_point(0.217567, -3.628506, s, m)} ${scaled_point(0.257747, -3.685801, s, m)}
      			${scaled_point(0.270865, -3.733087, s, m)} ${scaled_point(0.27387, -3.795605, s, m)} ${scaled_point(0.267344, -3.861814, s, m)} ${scaled_point(0.251867, -3.920172, s, m)} ${scaled_point(0.245195, -3.935154, s, m)}
      			${scaled_point(0.196239, -4.002834, s, m)} ${scaled_point(0.132534, -4.049819, s, m)} ${scaled_point(0.059404, -4.076108, s, m)} ${scaled_point(-0.017826, -4.081702, s, m)}
      			${scaled_point(-0.093834, -4.0666, s, m)} ${scaled_point(-0.163295, -4.030803, s, m)} ${scaled_point(-0.220885, -3.974311, s, m)} ${scaled_point(-0.245196, -3.935154, s, m)}
      			${scaled_point(-0.264738, -3.876936, s, m)} ${scaled_point(-0.273332, -3.807765, s, m)} ${scaled_point(-2.832837, -3.807765, s, m)} ${scaled_point(-2.834673, -3.851408, s, m)}
      			${scaled_point(-2.844296, -4.091749, s, m)} ${scaled_point(-2.799931, -4.136113, s, m)} ${scaled_point(-2.772716, -4.15976, s, m)} ${scaled_point(-2.744509, -4.174199, s, m)}
      			${scaled_point(-2.711392, -4.178763, s, m)} ${scaled_point(-2.669445, -4.172782, s, m)} ${scaled_point(-2.614749, -4.155586, s, m)} ${scaled_point(-2.543384, -4.126508, s, m)}
      			${scaled_point(-2.451431, -4.084878, s, m)} ${scaled_point(-2.423583, -4.071877, s, m)} ${scaled_point(-2.1919, -3.963276, s, m)} ${scaled_point(-2.133862, -3.992885, s, m)}
      			${scaled_point(-2.099153, -4.011875, s, m)} ${scaled_point(-2.078413, -4.0257, s, m)} ${scaled_point(-2.075824, -4.028913, s, m)} ${scaled_point(-2.073653, -4.048275, s, m)}
      			${scaled_point(-2.067744, -4.090284, s, m)} ${scaled_point(-2.059007, -4.149133, s, m)} ${scaled_point(-2.04835, -4.219015, s, m)} ${scaled_point(-2.03668, -4.294122, s, m)}
      			${scaled_point(-2.024906, -4.368647, s, m)} ${scaled_point(-2.013937, -4.436784, s, m)} ${scaled_point(-2.00468, -4.492725, s, m)} ${scaled_point(-1.998043, -4.530662, s, m)}
      			${scaled_point(-1.995249, -4.544091, s, m)} ${scaled_point(-1.970726, -4.581136, s, m)} ${scaled_point(-1.927787, -4.610693, s, m)} ${scaled_point(-1.876832, -4.626304, s, m)}
      			${scaled_point(-1.861252, -4.627302, s, m)} ${scaled_point(-1.837888, -4.626202, s, m)} ${scaled_point(-1.815178, -4.621493, s, m)} ${scaled_point(-1.789413, -4.610987, s, m)}
      			${scaled_point(-1.756884, -4.592496, s, m)} ${scaled_point(-1.713879, -4.56383, s, m)} ${scaled_point(-1.656691, -4.522801, s, m)} ${scaled_point(-1.581609, -4.46722, s, m)}
      			${scaled_point(-1.550319, -4.443852, s, m)} ${scaled_point(-1.483851, -4.394341, s, m)} ${scaled_point(-1.43593, -4.359837, s, m)} ${scaled_point(-1.402018, -4.338083, s, m)}
      			${scaled_point(-1.377572, -4.326819, s, m)} ${scaled_point(-1.358053, -4.323789, s, m)} ${scaled_point(-1.33892, -4.326733, s, m)} ${scaled_point(-1.323551, -4.331072, s, m)}
      			${scaled_point(-1.285068, -4.344842, s, m)} ${scaled_point(-1.258753, -4.358567, s, m)} ${scaled_point(-1.255775, -4.361116, s, m)} ${scaled_point(-1.24674, -4.378794, s, m)}
      			${scaled_point(-1.230143, -4.418921, s, m)} ${scaled_point(-1.207848, -4.4767, s, m)} ${scaled_point(-1.181719, -4.547332, s, m)} ${scaled_point(-1.160769, -4.605733, s, m)}
      			${scaled_point(-1.13231, -4.683905, s, m)} ${scaled_point(-1.105421, -4.753757, s, m)} ${scaled_point(-1.082179, -4.810189, s, m)} ${scaled_point(-1.064662, -4.8481, s, m)}
      			${scaled_point(-1.056762, -4.861064, s, m)} ${scaled_point(-1.027442, -4.882884, s, m)} ${scaled_point(-0.987867, -4.901113, s, m)} ${scaled_point(-0.987174, -4.901343, s, m)}
      			${scaled_point(-0.94738, -4.908749, s, m)} ${scaled_point(-0.908446, -4.901932, s, m)} ${scaled_point(-0.866248, -4.878528, s, m)} ${scaled_point(-0.816663, -4.836174, s, m)}
      			${scaled_point(-0.755567, -4.772506, s, m)} ${scaled_point(-0.74815, -4.764303, s, m)} ${scaled_point(-0.674156, -4.682109, s, m)} ${scaled_point(-0.616749, -4.618847, s, m)}
      			${scaled_point(-0.573085, -4.572146, s, m)} ${scaled_point(-0.540324, -4.539633, s, m)} ${scaled_point(-0.515624, -4.51894, s, m)} ${scaled_point(-0.496143, -4.507694, s, m)}
      			${scaled_point(-0.479039, -4.503524, s, m)} ${scaled_point(-0.46147, -4.504061, s, m)} ${scaled_point(-0.440596, -4.506933, s, m)} ${scaled_point(-0.439798, -4.507043, s, m)}
      			${scaled_point(-0.376037, -4.515782, s, m)} ${scaled_point(-0.244329, -4.736703, s, m)} ${scaled_point(-0.200376, -4.809392, s, m)} ${scaled_point(-0.160042, -4.874175, s, m)}
      			${scaled_point(-0.126166, -4.926638, s, m)} ${scaled_point(-0.101587, -4.962371, s, m)} ${scaled_point(-0.090134, -4.976287, s, m)} ${scaled_point(-0.058742, -4.988864, s, m)}
      			${scaled_point(-0.011927, -4.994195, s, m)}
      		)
      		(stroke
      			(width 0)
      			(type solid)
      		)
      		(fill yes)
      		(layer "${side}.SilkS")
      	)
      `
    }
    const common_top = `
  (footprint "ceoloide:utility_ergogen_logo"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at ${p.scale * 4.572} 0 ${p.r})
      (layer "${p.side}.Fab")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
		(attr exclude_from_pos_files exclude_from_bom)
    `
    const common_bottom = `
  )
    `
    let ergogen_log_fp = common_top
    if (p.reversible) {
      ergogen_log_fp += fp_poly('F', p.layer, p.scale, false)
      ergogen_log_fp += fp_poly('B', p.layer, p.scale, true)
    } else {
      ergogen_log_fp += fp_poly(p.side, p.layer, p.scale, p.side == 'B')
    }
    ergogen_log_fp += common_bottom
    return ergogen_log_fp
  }
};
