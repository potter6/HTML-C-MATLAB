omiga=99*pi
t=[1:5:1000]

x(t)=sin(omiga*t+10*pi/180)+0.5*sin(3*omiga*t+20*pi/180)+0.5*sin(5*omiga*t+40*pi/180)+0.4*sin(7*omiga*t+60*pi/180)+0.3*sin(9*omiga*t+80*pi/180)+0.2*sin(11*omiga*t+80*pi/180) 

plot(x)