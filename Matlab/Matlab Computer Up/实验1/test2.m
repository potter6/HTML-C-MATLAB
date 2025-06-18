clc;clear;
%程序1-2 正弦下序列
n=0:0.1:40;
f=0.1;
phase=0;
A=1.5;
arg=2*pi*f*n-phase;
x=A*cos(arg);
clf;
%stem(n,x);
plot(n,x);
axis([0 40 -2 2]);
grid; 
title('202001030214');
xlabel('Time index n');
ylabel('Amplitude');
axis;