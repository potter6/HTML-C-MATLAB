% x��y���Ƶ��������
% X��Y��Z ���Ƶ�ռ�����
% f ����
% X0��Y0��Z0��fai��omg��c �����ⷽλԪ��
% x0��y0��-f �ڷ�λԪ��
% count ��¼��������
% R ��ת����
% A ���Ի���ƫ��ϵ������
% L ���������
% M0 �ⷽλԪ�ؾ���
% M1 �ⷽλԪ�ظ���������

%Э������Q
%��λȨ�����m0
Q=0;
m0=0;
clear; clc;

%�ڷ�λԪ��
f=153.24/1000;  % 'm'
x0=0.0;               % 'mm'
y0=0.0;               % 'mm'
%������Ƶ�����
x=([-86.15 -53.40 -14.78 10.46]-x0)./1000;   %'m'
y=([-68.99 82.21 -76.63 64.43]-y0)./1000;    %'m'
X=[36589.41 37631.08 39100.97 40426.54];
Y=[25273.32 31324.51 24934.98 30319.81];
Z=[2195.17 728.69 2386.50 757.31];

%����f �������ⷽλԪ��X��Y��Z ��Ԫ�� fai��w��k���ڷ�λԪ��x��y��ʼֵ
X0=mean(X);
Y0=mean(Y);
fai=0;
w=0;
k=0;

scale=0;     %������
for i=2:4
    dX=X(i)-X(1);dY=Y(i)-Y(1);
    dx=x(i)-x(1);dy=y(i)-y(1);
    scale=scale+sqrt(dX*dX+dY*dY)/sqrt(dx*dx+dy*dy);
end
scale=scale/3;%ƽ��������
Z0=mean(Z)+f*scale;
M0=[X0,Y0,Z0,fai,w,k]';   %�ⷽλԪ�صĳ�ֵ

%����ѭ��������ⷽλ��Ԫ�ظ�����С���޲�0.00001
%����ѭ����������50��ѭ������
count=0;
M1=999;
while(max(abs(M1))>0.000001 && count<50)
    %��ת����R ת��
    A=[ ];L=[ ];
    a1=cos(fai)*cos(k)-sin(fai)*sin(w)*sin(k);
    a2=-cos(fai)*sin(k)-sin(fai)*sin(w)*cos(k);
    a3=-sin(fai)*cos(w);
    b1=cos(w)*sin(k);
    b2=cos(w)*cos(k);
    b3=-sin(w);
    c1=sin(fai)*cos(k)+cos(fai)*sin(w)*sin(k);
    c2=-sin(fai)*sin(k)+cos(fai)*sin(w)*cos(k);
    c3=cos(fai)*cos(w);
    %R=[a1,a2,a3;b1,b2,b3;c1,c2,c3];
    %��ƫ��ϵ���ľ���A�ͳ�������L
    for i=1:4
        XX=a1*(X(i)-X0)+b1*(Y(i)-Y0)+c1*(Z(i)-Z0);
        YY=a2*(X(i)-X0)+b2*(Y(i)-Y0)+c2*(Z(i)-Z0);
        ZZ=a3*(X(i)-X0)+b3*(Y(i)-Y0)+c3*(Z(i)-Z0);
        a11=1/ZZ*(a1*f+a3*(x(i)));
        a12=1/ZZ*(b1*f+b3*(x(i)));
        a13=1/ZZ*(c1*f+c3*(x(i)));
        a21=1/ZZ*(a2*f+a3*(y(i)));
        a22=1/ZZ*(b2*f+b3*(y(i)));
        a23=1/ZZ*(c2*f+c3*(y(i)));
        a14=(y(i))*sin(w)-((x(i))/f*((x(i))*cos(k)-(y(i))*sin(k))+f*cos(k))*cos(w);
        a15=-f*sin(k)-(x(i))/f*((x(i))*sin(k)+(y(i))*cos(k));
        a16=y(i);
        a24=-(x(i))*sin(w)-((y(i))/f*((x(i))*cos(k)-(y(i))*sin(k))-f*sin(k))*cos(w);
        a25=-f*cos(k)-(y(i))/f*((x(i))*sin(k)+(y(i))*cos(k));
        a26=-(x(i));
        
        T1=[a11 a12 a13 a14 a15 a16 ; a21 a22 a23 a24 a25 a26];
        T2=[x(i)+f*XX/ZZ;y(i)+f*YY/ZZ];
        A=[A;T1];
        L=[L;T2];
    end
        %����������M1����������ⷽλԪ�ؾ���M0-x0-y0
        M1=inv(A'*A)*(A'*L);
        M0=M0+M1;
        X0=M0(1);
        Y0=M0(2);
        Z0=M0(3);
        fai=M0(4);
        w=M0(5);
        k=M0(6);
        count=count+1;
end
Q=inv(A'*A);
m0=sqrt((M0'*M0)/(2*numel(Z)-6));
format long
count
M0
%��������
Q
m0

