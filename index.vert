precision highp float;

attribute vec2 position;
varying vec2 vuv;

// drawing a full screen canvas
void main() {
  vuv = (position + 1.0) / 2.0; // convert from -1,1 to 0,1
  gl_Position = vec4(position, 1.0, 1.0);
}
