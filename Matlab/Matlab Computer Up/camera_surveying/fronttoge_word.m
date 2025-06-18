%===========%
%=�ռ�ǰ������=��ͶӰϵ����=%
%===========%

% x��y ���Ƶ��������
% X��Y��Z ���Ƶ�ռ�����
% f ����
% X0��Y0��Z0��fai��omg��k �����ⷽλԪ��
% -f��x0��y0 �ڷ�λԪ��
% ���Һ�ƬR1��R2 ��ת����
% Bx��By��Bz��Ӱ���߷���  
% XYZ1��XYZ2��ռ丨������
% N1��N2 ��ͶӰϵ�� 
% Xa��Xb��Ya��Yb��Za��Zb ������Ӱ��������
clear;clc;close all;

%1. ������֪�ⷽλԪ�ء������������
% �ڷ�λԪ��
f=101.400/1000; %'m'
x0=-0.180;           %'mm'
y0=0.00;              %'mm'

%��ת���Ȳ������
temp=pi/180;
%��Ƭ�ⷽλԪ��ֵ
X1=5426.198;
Y1=4242.315;
Z1=1022.629;
fai1=-0.116589*temp;
omg1=-0.018569*temp;
k1=0.078569*temp;
XYZ1=[X1;Y1;Z1];

%��Ƭ�ⷽλԪ��ֵ
X2=5528.045;
Y2=4239.854;
Z2=1018.517;
fai2=-0.011847*temp;
omg2=0.014583*temp;
k2=0.108921*temp;
XYZ2=[X2;Y2;Z2];
%���������Ƭ����ƽ������
x1=0.02718-x0/1000;x2=0.01558-x0/1000;
y1=0.02764;y2=0.02797;

% a����Ӱ���߷���
Bx=X2-X1;
By=Y2-Y1;
Bz=Z2-Z1;
% b������ת����R1��R2 �����Һ�Ƭ��ת����
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

% c����ռ丨������
XYZ1=R1*[x1,y1,-f]';
XYZ2=R2*[x2,y2,-f]';

% d����ͶӰϵ��
N1=(Bx*XYZ2(3)-Bz*XYZ2(1))/(XYZ1(1)*XYZ2(3)-XYZ2(1)*XYZ1(3));
N2=(Bx*XYZ1(3)-Bz*XYZ1(1))/(XYZ1(1)*XYZ2(3)-XYZ2(1)*XYZ1(3));

% e�� ������Ӱ��������
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
%2. ��������ʽ
%xyf1=[];
%xyf2=[];

%uvw1=R1*xyf1;
%uvw2=R2*xyf2;

%Bu=X2-X1;Bv=Y2-Y1;Bw=Z2-Z1;
%XYZ=zero(3,n);
%=================

%3. ��ɷ����̣�����δ֪��ĵ�������
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


