%===========%
%=空间前方交会=共线方程法=%
%===========%

% x，y控制点像点坐标
% X，Y，Z 控制点空间坐标
% f 焦距
% X0，Y0，Z0，fai，w，c 六个外方位元素
% x0，y0，-f 内方位元素
% count 记录迭代次数
% R 旋转矩阵
% A 线性化的偏导系数矩阵
% L 常数项矩阵
% R1 R2 两个旋转矩阵
% M0 外方位元素矩阵
% M1 外方位元素改正数矩阵
%协因数阵Q
%单位权中误差m0
clear; clc;

%内方位元素
x0=-0.18/1000;
y0=0;
f=101.4/1000;
%左、右片相关元素
temp=pi/180;
fai=[-0.116589 -0.011847]*temp;
w=[-0.018569 0.014583]*temp;
c=[0.078569 0.108921]*temp;
XS=[5426.198 5528.045];
YS=[4242.315 4239.854];
ZS=[1022.629 1018.517];
%地面点对应的左右片 像平面坐标
x=([0.02718,0.01558]-x0);
y=([0.02764,0.02797]-y0);

X=mean(XS);
Y=mean(YS);

scale=0;     %比例尺
dX=XS(2)-XS(1);dY=YS(2)-YS(1);
dx=x(2)-x(1);dy=y(2)-y(1);
scale=scale+sqrt(dX*dX+dY*dY)/sqrt(dx*dx+dy*dy);
Z=mean(ZS)+f*scale;

M0=[X Y Z]';%的初值

%算法 开始循环
count=0;
M1=999;
while(max(abs(M1))>0.000001&&count<50)
A=[];L=[];
    for i=1:2
    a1=cos(fai(i))*cos(c(i))-sin(fai(i))*sin(w(i))*sin(c(i));
    a2=-cos(fai(i))*sin(c(i))-sin(fai(i))*sin(w(i))*cos(c(i));
    a3=-sin(fai(i))*cos(w(i));
    b1=cos(w(i))*sin(c(i));
    b2=cos(w(i))*cos(c(i));
    b3=-sin(w(i));
    c1=sin(fai(i))*cos(c(i))+cos(fai(i))*sin(w(i))*sin(c(i));
    c2=-sin(fai(i))*sin(c(i))+cos(fai(i))*sin(w(i))*cos(c(i));
    c3=cos(fai(i))*cos(w(i));
    XX=a1*(X-XS(i))+b1*(Y-YS(i))+c1*(Z-ZS(i));
    YY=a2*(X-XS(i))+b2*(Y-YS(i))+c2*(Z-ZS(i));
    ZZ=a3*(X-XS(i))+b3*(Y-YS(i))+c3*(Z-ZS(i));
    a11=-1/ZZ*(a1*f+a3*(x(i)));
    a12=-1/ZZ*(b1*f+b3*(x(i)));
    a13=-1/ZZ*(c1*f+c3*(x(i)));
    a21=-1/ZZ*(a2*f+a3*(y(i)));
    a22=-1/ZZ*(b2*f+b3*(y(i)));
    a23=-1/ZZ*(c2*f+c3*(y(i)));
    T1=[a11 a12 a13;a21 a22 a23];
    T2=[x(i)+f*XX/ZZ;y(i)+f*YY/ZZ];
    A=[A;T1];
    L=[L;T2];
    end
    M1=inv(A'*A)*(A'*L);
    M0=M0+M1;
    X=M0(1);
    Y=M0(2);
    Z=M0(3);
    count=count+1;
end
Q=inv(A'*A);
m0=sqrt((M0'*M0)/(2*numel(Z)-6));
format long g
count
M0
Q
m0

     