#version 300 es
// Copyright (c) 2026 KarmenLoop. All rights reserved.
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uEnvironment;
uniform vec2 uSize;
uniform vec2 uTilt;
uniform float uRadius;
uniform float uBevel;
uniform float uGrain;
uniform vec3 uLight;
uniform float uLightPower;
uniform float uRoughness;
uniform int uView;
const float PI = 3.141592653589793;
float roundedDistance(vec2 p) {
  vec2 q = abs(p) - (uSize * 0.5 - uRadius);
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
}
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453) * 2.0 - 1.0;
}
vec3 encodeColor(vec3 c) {
  c = max(c, vec3(0.0));
  return mix(12.92 * c, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}
void main() {
  vec2 p = (vUv - 0.5) * uSize;
  float distance = roundedDistance(p);
  float mask = 1.0 - smoothstep(-0.8, 0.2, distance);
  vec2 gradient = vec2(
    roundedDistance(p + vec2(0.25, 0.0)) - roundedDistance(p - vec2(0.25, 0.0)),
    roundedDistance(p + vec2(0.0, 0.25)) - roundedDistance(p - vec2(0.0, 0.25))
  );
  gradient /= max(length(gradient), 0.0001);
  float bevel = uBevel > 0.0 ? clamp(1.0 + distance / uBevel, 0.0, 1.0) * 0.94 : 0.0;
  float grain = noise(floor(p * vec2(0.55, 2.8)));
  vec3 localNormal = normalize(vec3(gradient * bevel + vec2(grain, noise(floor(p.yx * 2.0))) * uGrain,
    sqrt(max(0.001, 1.0 - bevel * bevel))));
  // CSS uses downward Y. Convert rotateX(rx) rotateY(ry) into upward-Y space.
  float cx = cos(uTilt.x), sx = sin(uTilt.x), cy = cos(uTilt.y), sy = sin(uTilt.y);
  mat3 rotateX = mat3(1, 0, 0, 0, cx, -sx, 0, sx, cx);
  mat3 rotateY = mat3(cy, 0, -sy, 0, 1, 0, sy, 0, cy);
  mat3 rotation = rotateX * rotateY;
  vec3 normal = normalize(rotation * localNormal);
  vec3 position = rotation * vec3(p, 0.0);
  vec3 incident = normalize(position - vec3(0.0, 0.0, 1000.0));
  vec3 reflected = reflect(incident, normal);
  vec2 environmentUv = vec2(atan(reflected.z, reflected.x) / (2.0 * PI) + 0.5,
    acos(clamp(reflected.y, -1.0, 1.0)) / PI);
  vec3 reflection = texture(uEnvironment, environmentUv).rgb;
  vec3 light = normalize(uLight);
  float facing = max(dot(normal, light), 0.0);
  vec3 halfway = normalize(light - incident);
  float highlight = pow(max(dot(normal, halfway), 0.0), mix(110.0, 24.0, uRoughness / 6.0));
  float edgeLight = pow(1.0 - max(dot(normal, -incident), 0.0), 3.0);
  vec3 surface = vec3(0.29, 0.31, 0.30) + reflection * vec3(0.66, 0.65, 0.64);
  surface *= 0.88 + 0.12 * facing * uLightPower;
  surface += (highlight * 0.12 + edgeLight * facing * 0.08) * uLightPower;
  surface += grain * uGrain * 0.28;
  if (uView == 1) surface = normal * 0.5 + 0.5;
  if (uView == 2) surface = reflection;
  if (uView == 3) surface = vec3(0.12 + (facing * 0.35 + highlight * 0.35 + edgeLight * facing * 0.2) * uLightPower);
  outColor = vec4(encodeColor(surface), mask);
}
