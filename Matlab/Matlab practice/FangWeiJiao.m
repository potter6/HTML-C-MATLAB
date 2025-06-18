x1=0;y1=0;x2=5;y2=5;

%¼ÆËã¾àÀëºÍ¼Ğ½Ç
dx = x2 - x1;
dy = y2 - y1;

theta =abs(atan(dy / dx)) * 180 / pi;
if(dx>0&&dy>0)
theta=theta;
elseif(dx>0&&dy<0)
theta=180-theta;
elseif(dx<0&&dy<0)
theta=180+theta;
elseif(dx<0&&dy>0)
theta=360-theta;
end

    
theta
