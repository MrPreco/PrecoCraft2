function moveTowards(from, to, speed) {
    if(from < to){
      from += Math.sign(to - from) * speed;
      if(from > to){
        from = to;
      }
      return from;
    }
    else if(from > to){
      from += Math.sign(to - from) * speed;
      if(from < to){
        from = to;
      }
      return from;
    }
    return to;
  }

const lerp = (x, y, a) => x * (1 - a) + y * a;