clc; clear;
% 内方位元素
x0=-0.180;  % mm
y0=0.00;    % mm
f=101.400;  % mm

% 左片外方位元素值:
X1 = 1596.070789584793100 ;
Y1 = 727.985181253588280 ;
Z1 = 2757.816945770138800 ;
fai1 = -0.003583353403106 ;
omeiga1 = -0.008945322105745 ;
kapa1 = -0.002050593799908 ;
XYZ1=[X1; Y1; Z1];

% 右片外方位元素值:
X2 = 2152.643085482715400 ;
Y2 = 711.380277616443550 ;
Z2 = 2753.805719037688000 ;
fai2 = 0.008401232256185 ;
omeiga2 = 0.016493163167405 ;
kapa2 = 0.008060474858143 ;
XYZ2=[X2; Y2; Z2];

R1=[ cos(fai1)*cos(kapa1)-sin(fai1)*sin(omeiga1)*sin(kapa1)  -cos(fai1)*sin(kapa1)-sin(fai1)*sin(omeiga1)*cos(kapa1)  -sin(fai1)*cos(omeiga1) 
     cos(omeiga1)*sin(kapa1) cos(omeiga1)*cos(kapa1) -sin(omeiga1)
     sin(fai1)*cos(kapa1)+cos(fai1)*sin(omeiga1)*sin(kapa1)  -sin(fai1)*sin(kapa1)+cos(fai1)*sin(omeiga1)*cos(kapa1)  cos(fai1)*cos(omeiga1) ];
 
 R2=[ cos(fai2)*cos(kapa2)-sin(fai2)*sin(omeiga2)*sin(kapa2)  -cos(fai2)*sin(kapa2)-sin(fai2)*sin(omeiga2)*cos(kapa2)  -sin(fai2)*cos(omeiga2) 
     cos(omeiga2)*sin(kapa2) cos(omeiga2)*cos(kapa2) -sin(omeiga2)
     sin(fai2)*cos(kapa2)+cos(fai2)*sin(omeiga2)*sin(kapa2)  -sin(fai2)*sin(kapa2)+cos(fai2)*sin(omeiga2)*cos(kapa2)  cos(fai2)*cos(omeiga2) ];
 
load xy12;
n=length(xy1(:,1));
xyf1=[xy1(:,1)-x0  xy1(:,2)-y0  -f.*ones(n,1)]';
xyf2=[xy2(:,1)-x0  xy2(:,2)-y0  -f.*ones(n,1)]';

uvw1=R1*xyf1;
uvw2=R2*xyf2;

bu=X2-X1; bv=Y2-Y1; bw=Z2-Z1;
XYZ=zeros(3,n);
for i=1:n
   N1=(bu*uvw2(3,i)-bw*uvw2(1,i))/(uvw1(1,i)*uvw2(3,i)-uvw1(3,i)*uvw2(1,i));
   N2=(bu*uvw1(3,i)-bw*uvw1(1,i))/(uvw1(1,i)*uvw2(3,i)-uvw1(3,i)*uvw2(1,i));
   UVW1=N1*uvw1(:,i);
   UVW2=N2*uvw2(:,i);
   XYZ(:,i)=(XYZ1+UVW1+XYZ2+UVW2)/2;
end
XYZ=XYZ';
