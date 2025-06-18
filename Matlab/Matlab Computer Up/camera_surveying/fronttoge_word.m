%===========%
%=空间前方交会=点投影系数法=%
%===========%

% x，y 控制点像点坐标
% X，Y，Z 控制点空间坐标
% f 焦距
% X0，Y0，Z0，fai，omg，k 六个外方位元素
% -f，x0，y0 内方位元素
% 左、右航片R1、R2 旋转矩阵
% Bx、By、Bz摄影基线分量  
% XYZ1、XYZ2像空间辅助坐标
% N1、N2 点投影系数 
% Xa、Xb、Ya、Yb、Za、Zb 地面摄影测量坐标
clear;clc;close all;

%1. 读入已知外方位元素、像点坐标数据
% 内方位元素
f=101.400/1000; %'m'
x0=-0.180;           %'mm'
y0=0.00;              %'mm'

%度转弧度参与计算
temp=pi/180;
%左片外方位元素值
X1=5426.198;
Y1=4242.315;
Z1=1022.629;
fai1=-0.116589*temp;
omg1=-0.018569*temp;
k1=0.078569*temp;
XYZ1=[X1;Y1;Z1];

%右片外方位元素值
X2=5528.045;
Y2=4239.854;
Z2=1018.517;
fai2=-0.011847*temp;
omg2=0.014583*temp;
k2=0.108921*temp;
XYZ2=[X2;Y2;Z2];
%地面点左右片的像平面坐标
x1=0.02718-x0/1000;x2=0.01558-x0/1000;
y1=0.02764;y2=0.02797;

% a）摄影基线分量
Bx=X2-X1;
By=Y2-Y1;
Bz=Z2-Z1;
% b）求旋转矩阵R1，R2 （左、右航片旋转矩阵）
  a11=cos(fai1)*cos(k1)-sin(fai1)*sin(omg1)*sin(k1);
  a12=-cos(fai1)*sin(k1)-sin(fai1)*sin(omg1)*cos(k1);
  a13=-sin(fai1)*cos(omg1);
  b11= cos(omg1)*sin(k1);
  b12= cos(omg1)*cos(k1);
  b13=-sin(omg1);
  c11= sin(fai1)*cos(k1)+cos(fai1)*sin(omg1)*sin(k1);
  c12=sin(fai1)*sin(k1)+cos(fai1)*sin(omg1)*cos(k1);
  c13=cos(fai1)*cos(omg1);
         R1=[ a11,a12,a13;b11,b12,b13;c11,c12,c13];
  
  a21=cos(fai2)*cos(k2)-sin(fai2)*sin(omg2)*sin(k2);
  a22=-cos(fai2)*sin(k2)-sin(fai2)*sin(omg2)*cos(k2);
  a23=-sin(fai2)*cos(omg2);
  b21= cos(omg2)*sin(k2);
  b22= cos(omg2)*cos(k2);
  b23=-sin(omg2);
  c21=sin(fai2)*cos(k2)+cos(fai2)*sin(omg2)*sin(k2);
  c22=-sin(fai2)*sin(k2)+cos(fai2)*sin(omg2)*cos(k2);
  c23=cos(fai2)*cos(omg2);
        R2=[a21,a22,a23;b21,b22,b23;c21,c22,c23];

% c）像空间辅助坐标
XYZ1=R1*[x1,y1,-f]';
XYZ2=R2*[x2,y2,-f]';

% d）点投影系数
N1=(Bx*XYZ2(3)-Bz*XYZ2(1))/(XYZ1(1)*XYZ2(3)-XYZ2(1)*XYZ1(3));
N2=(Bx*XYZ1(3)-Bz*XYZ1(1))/(XYZ1(1)*XYZ2(3)-XYZ2(1)*XYZ1(3));

% e） 地面摄影测量坐标
Xa=X1+N1*XYZ1(1);
Ya=Y1+N1*XYZ1(2);
Za=Z1+N1*XYZ1(3);

Xb=X2+N2*XYZ2(1);
Yb=Y2+N2*XYZ2(2);
Zb=Z2+N2*XYZ2(3);

Xj=(Xa+Xb)/2;
Yj=(Ya+Yb)/2;
Zj=(Za+Zb)/2;

%=================
%2. 建立误差方程式
%xyf1=[];
%xyf2=[];

%uvw1=R1*xyf1;
%uvw2=R2*xyf2;

%Bu=X2-X1;Bv=Y2-Y1;Bw=Z2-Z1;
%XYZ=zero(3,n);
%=================

%3. 组成法方程，解算未知点的地面坐标
format long
R1
R2
XYZ1
XYZ2
Bx
By
Bz
Xa
Xb
Ya
Yb
Za
Zb
Xj
Yj
Zj


