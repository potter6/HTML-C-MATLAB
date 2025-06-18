% x，y 控制点像点坐标
% X，Y，Z 控制点空间坐标
% f焦距
% X0，Y0，Z0，fai，w，c六个外方位元素
% x0，y0，-f内方位元素
% count 记录迭代次数
% R 旋转矩阵
% A 线性化的偏导系数矩阵
% L 常数项矩阵
% M0 外方位元素矩阵
% M1 外方位元素改正数矩阵
clear all; clc;
%内方位元素
f=101.4/1000;     % 以“m”为单位
x0=-0.180;          % 以“mm”为单位
y0=0.0;               % 以“mm”为单位
%输入控制点坐标
x=([28.254, 9.072, 17.031, 26.741] - x0)./1000;        % 以“m”为单位
y=([-18.226, -3.652, 8.578, -0.878] - y0)./1000;            % 以“m”为单位
X=[2338.209161, 1828.545727, 2039.522449, 2298.3718222];  
Y=[216.501881, 605.738823, 930.949764, 679.172466];
Z=[57.465994, 50.452227, 58.556086, 55.983648];
%焦距f；输入外方位元素位置元素X,Y,Z，角元素fai，w，k，内方位元素x, y的初始值

X0=mean(X);
Y0=mean(Y);
fai=0; 
w=0; 
k=0;

scale=0;    % 比例尺
for i=2:4
    dX=X(i)-X(1); dY=Y(i)-Y(1);
    dx=x(i)-x(1); dy=y(i)-y(1);
    scale=scale+sqrt(dX*dX+dY*dY)/sqrt(dx*dx+dy*dy);
end
scale=scale/3;       % 平均比例尺
Z0=mean(Z)+f*scale;

M0=[X0, Y0, Z0, fai, w, k]';     % 外方位元素的初值

%进入循环, 如果外方位角元素改正数小于限差0.00001'或循环次数大于50，循环结束
count=0;
M1=999;
while (max(abs(M1))>0.000001 && count<50)  
    %旋转矩阵R  
    A=[ ]; L=[ ];
    a1 = cos(fai)*cos(k)-sin(fai)*sin(w)*sin(k);
    a2 = -cos(fai)*sin(k)-sin(fai)*sin(w)*cos(k);
    a3 = -sin(fai)*cos(w);
    b1 = cos(w)*sin(k);
    b2 = cos(w)*cos(k);
    b3 = -sin(w);
    c1 = sin(fai)*cos(k)+cos(fai)*sin(w)*sin(k);
    c2 = -sin(fai)*sin(k)+cos(fai)*sin(w)*cos(k);
    c3 = cos(fai)*cos(w);
  % R=[a1,a2,a3;b1,b2,b3;c1,c2,c3];
  % 求偏导系数矩阵A和常数矩阵L
  for i=1:4
    XX = a1*(X(i)-X0)+b1*(Y(i)-Y0)+c1*(Z(i)-Z0);
    YY = a2*(X(i)-X0)+b2*(Y(i)-Y0)+c2*(Z(i)-Z0);
    ZZ = a3*(X(i)-X0)+b3*(Y(i)-Y0)+c3*(Z(i)-Z0);
    a11 = 1/ZZ*(a1*f+a3*(x(i))); 
    a12 = 1/ZZ*(b1*f+b3*(x(i)));  
    a13 = 1/ZZ*(c1*f+c3*(x(i)));  
    a21 = 1/ZZ*(a2*f+a3*(y(i))); 
    a22 = 1/ZZ*(b2*f+b3*(y(i)));  
    a23 = 1/ZZ*(c2*f+c3*(y(i)));   
    a14 = (y(i))*sin(w)-((x(i))/f*((x(i))*cos(k)-(y(i))*sin(k))+f*cos(k))*cos(w); 
    a15 = -f*sin(k)-(x(i))/f*((x(i))*sin(k)+(y(i))*cos(k));
    a16 = y(i);
    a24 = -(x(i))*sin(w)-((y(i))/f*((x(i))*cos(k)-(y(i))*sin(k))-f*sin(k))*cos(w);
    a25 = -f*cos(k)-(y(i))/f*((x(i))*sin(k)+(y(i))*cos(k));
    a26 = -(x(i));  

    T1=[a11 a12 a13 a14 a15 a16;  a21 a22 a23 a24 a25 a26];
    T2=[x(i)+f*XX/ZZ;  y(i)+f*YY/ZZ];
    A=[A; T1];  
    L=[L; T2];
  end
   %求改正项矩阵M1和修正后的外方位元素矩阵M0-x0-y0
   M1 = inv(A'*A)*(A'*L);
   M0 = M0+M1;
   X0 = M0(1);
   Y0 = M0(2);
   Z0 = M0(3);
   fai = M0(4);
   w  = M0(5);
   k  = M0(6);
   count=count+1;   %迭代一次后计数器增加   
end
%检验迭代次数
count
M0