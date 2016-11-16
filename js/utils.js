const Utils = {
  dist(pos1, pos2) {
    let xSquared = Math.pow(pos1[0] - pos2[0], 2);
    let ySquared = Math.pow(pos1[1] - pos2[1], 2);
    return Math.sqrt(xSquared + ySquared);
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  },

  direction(vec) {
    let norm = Utils.norm(vec);
    return Utils.scale(vec, 1 / norm);
  },

  norm(vec) {
    return Utils.dist([0, 0], vec);
  },

  scale(vec, magnitude) {
    return [vec[0] * magnitude, vec[1] * magnitude];
  },

  randomVec(length) {
    let degree = 2 * Math.PI * Math.random();
    return Utils.scale([Math.sin(degree), Math.cos(degree)], length);
  }
};

export default Utils;
