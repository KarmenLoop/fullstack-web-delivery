#version 300 es
// Copyright (c) 2026 KarmenLoop. All rights reserved.
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uSource;
uniform vec2 uDirection;
uniform vec2 uTexel;
uniform float uSigma;
uniform bool uDecode;
uniform float uDesaturate;
vec3 linearColor(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(vec3(0.04045), c));
}
void main() {
  vec3 sum = vec3(0.0);
  float weights = 0.0;
  for (int i = -8; i <= 8; i++) {
    float weight = uSigma < 0.01 ? (i == 0 ? 1.0 : 0.0)
      : exp(-float(i * i) / (2.0 * uSigma * uSigma));
    vec3 color = texture(uSource, vUv + uDirection * uTexel * float(i)).rgb;
    if (uDecode) color = linearColor(color);
    sum += color * weight;
    weights += weight;
  }
  vec3 color = sum / max(weights, 0.00001);
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  outColor = vec4(mix(color, vec3(luminance), uDesaturate), 1.0);
}
