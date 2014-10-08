precision highp float;

uniform sampler2D uInput;
varying vec2 vuv;

highp vec4 encode_float(highp float v) {
  highp vec4 c = vec4(0.0, 0.0, 0.0, 0.0);
  if (v < 0.0) {
    c[0] += 64.0;
    v = -v;
  }
  highp float f = 0.0;
  highp float e = ceil(log2(v));
  highp float m = v * exp2(-e);
  if (e < 0.0) {
    e = -e;
    c[0] += 128.0;
  }
  c[0] += e;
  m *= 255.0;
  f = floor(m);
  c[1] = f;
  m  -= f;
  m *= 255.0;
  f = floor(m);
  c[2] = f;
  m  -= f;
  m *= 255.0;
  c[3] = floor(m);
  return c * 0.003921569;
}

float operation(float a) {
  return a; // REPLACE
}

float operation(float a, float b) {
  return b; // REPLACE
}

float operation(float a, float b, float c) {
  return c; // REPLACE
}

float operation(float a, float b, float c, float d) {
  return d; // REPLACE
}

void main() {
  float a = texture2D(uInput, vuv.yx).r;
  float b = texture2D(uInput, vuv.yx).g;
  float c = texture2D(uInput, vuv.yx).b;
  float d = texture2D(uInput, vuv.yx).a;

  // update data variable
  gl_FragColor = encode_float(operation());
}


