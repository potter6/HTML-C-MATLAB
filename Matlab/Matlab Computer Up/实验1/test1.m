%rand(2,3) 随机的2行3列的矩阵
clc;clear;
%赋值用 冒号 进行连续的连接
n=-10:20;
%用矩阵'[' ']' 进行赋值 zeros(零矩阵)
u=[zeros(1,10) 1 zeros(1,20)];
%用来绘制 二维 离散点
stem(n,u);
%plot(n,u);
%标注用 单引号 ' 
%实验报告有图的话 提名取自己学号
xlabel('Time index n');
ylabel('Amplitude');
%title('Unit Sample Sequence');
title('202001030214');
axis([-10 20 0 1.2]);
