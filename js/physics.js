class Physics {
  static dist(pos1, pos2) {
    let xSquared = Math.pow(pos1[0] - pos2[0], 2);
    let ySquared = Math.pow(pos1[1] - pos2[1], 2);
    return Math.sqrt(xSquared + ySquared);
  }

  static wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }

  static direction(vec) {
    let norm = this.norm(vec);
    return this.scale(vec, 1 / norm);
  }

  static norm(vec) {
    return this.dist([0, 0], vec);
  }

  static scale(vec, magnitude) {
    return [vec[0] * magnitude, vec[1] * magnitude];
  }

  static randomVec(length) {
    let degree = 2 * Math.PI * Math.random();
    // for not so random
    // let degree = 2 * Math.PI;
    return this.scale([Math.sin(degree), Math.cos(degree)], length);
  }

  static magnitude(vel) {
    return Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
  }

  // mass of a circle is C = PI * diameter
  static collide(obj1, obj2) {
    // calculate mass
    let m1 = Math.PI * Math.pow((obj1.radius), 2);
    let m2 = Math.PI * Math.pow((obj2.radius), 2);

    // calculate contact angle
    let dx = obj1.pos[0] - obj2.pos[0];
    let dy = obj1.pos[1] - obj2.pos[1];
    let angle = Math.atan2(dy, dx);
    // Math.atan2(y, x)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2

    // calculate velocity magnitudes and directional vectors
    let mag1 = this.magnitude(obj1.vel);
    let mag2 = this.magnitude(obj2.vel);
    let d1 = Math.atan2(obj1.vel[1], obj1.vel[0]);
    let d2 = Math.atan2(obj2.vel[1], obj2.vel[0]);

    // calculate new speeds based on magnitude, direction and the collision angle
    let newX1 = mag1 * Math.cos(d1 - angle);
    let newY1 = mag1 * Math.sin(d1 - angle);
    let newX2 = mag2 * Math.cos(d2 - angle);
    let newY2 = mag2 * Math.cos(d2 - angle);

    // Adjsut final speeds
    let finalX1 = ((m1 - m2) * newX1 + (m2+m2) *  newX2 / (m1 + m2));
    let finalX2 = ((m1 + m1) * newX1 + (m2 - m1) *  newX2 / (m1 + m2));
    let finalY1 = newY1;
    let finalY2 = newY2;

    let x1 = Math.cos(angle) * finalX1 + Math.cos(angle + Math.PI/2) * finalY1;
    let y1 = Math.sin(angle) * finalX1 + Math.sin(angle + Math.PI/2) * finalY1;
    let x2 = Math.cos(angle) * finalX2 + Math.cos(angle + Math.PI/2) * finalY2;
    let y2 = Math.sin(angle) * finalX2 + Math.sin(angle + Math.PI/2) * finalY2;

    obj1.bounce(x1, y1, obj2);
    obj1.bounce(x1, y1, obj2);

  }

  // convert degrees to radians
  static degToRad(angle) {
    return angle * (Math.PI / 180);
  }

  // Convert radians to degrees
  static radToDeg(angle) {
      return angle * (180 / Math.PI);
  }


}

export default Physics;
