%=======================%
%=========光束法=========%
%=======================%
% f，x0，y0航摄仪的内方位元素
% 6个地面控制点的左右像片坐标
% fai w k Xs Ys Zs外方位元素 左片右片的值 
% X Y Z地面点坐标
f=101.4/1000;       %'m'
x0=0;y0=0;          %'m'
LeftWAI=[];         %左片外方位元素
RightWAI=[];        %右片外方位元素    
WEI=[];             %未知点地面坐标

%6个地面控制点的地面坐标及其对应像点的左右像片坐标
x1p=([-48.412 -34.639 20.701 49.670 50.732 -22.505]-x0)./1000;
y1p=([54.553 36.506 11.033 -37.454 -46.470 -21.726]-y0)./1000;
x2p=([-58.558 -43.646 11.330 41.062 42.140 -31.442]-x0)./1000;
y2p=([52.713 35.066 10.160 -38.037 -47.061 -22.701]-x0)./1000;
Xs=[437500.36 437508.90 437566.49 437599.09 437599.95 437522.00];
Ys=[3118399.97 3118387.79 3118361.27 3118309.46 3118300.00 3118327.28];
Zs=[86.36  74.04 75.45 70.42 71.08 75.19];

%已知6个地面未知点的对应像点的左右像片坐标
%左片left
xl=([-37.787 19.323 50.281 30.573 35.389 5.394]-x0)./1000;
xr=([-47.064 10.250 41.416 22.085 26.896 -3.682]-x0)./1000;
%右片right
yl=([41.608 9.908 -15.493 -45.237 -45.439 -8.955]-x0)./1000;
yr=([40.072 9.048 -16.087 -45.906 -46.089 -9.826]-x0)./1000;

x00=[];y00=[];
for i=1:6
    x00=[x00;xl(i),xr(i)];
    y00=[y00;yl(i),yr(i)];
end

%焦距f 输入外方位元素X，Y，Z 角元素 fai，w，k 内方位元素x，y初始值
X0=mean(Xs);
Y0=mean(Ys);
fai=0;
w=0;
k=0;
Z0=mean(Zs);
M0=[X0,Y0,Z0,fai,w,k]';     %外方位元素的初值

%左片进入循环，如果外方位角元素改正数小于限差0.00001
%或者循环次数大于50，循环结束
count=0;
M1=999;
 while(max(abs(M1))>0.000001 && count<50)
    %旋转矩阵R 转化
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
    %求偏导系数的矩阵A和常数矩阵L
    for i=1:6
        XX=a1*(Xs(i)-X0)+b1*(Ys(i)-Y0)+c1*(Zs(i)-Z0);
        YY=a2*(Xs(i)-X0)+b2*(Ys(i)-Y0)+c2*(Zs(i)-Z0);
        ZZ=a3*(Xs(i)-X0)+b3*(Ys(i)-Y0)+c3*(Zs(i)-Z0);
        
        a11=1/ZZ*(a1*f+a3*(x1p(i)));
        a12=1/ZZ*(b1*f+b3*(x1p(i)));
        a13=1/ZZ*(c1*f+c3*(x1p(i)));
        a21=1/ZZ*(a2*f+a3*(y1p(i)));
        a22=1/ZZ*(b2*f+b3*(y1p(i)));
        a23=1/ZZ*(c2*f+c3*(y1p(i)));
        a14=(y1p(i))*sin(w)-((x1p(i))/f*((x1p(i))*cos(k)-(y1p(i))*sin(k))+f*cos(k))*cos(w);
        a15=-f*sin(k)-(x1p(i))/f*((x1p(i))*sin(k)+(y1p(i))*cos(k));
        a16=y1p(i);
        a24=-(x1p(i))*sin(w)-((y1p(i))/f*((x1p(i))*cos(k)-(y1p(i))*sin(k))-f*sin(k))*cos(w);
        a25=-f*cos(k)-(y1p(i))/f*((x1p(i))*sin(k)+(y1p(i))*cos(k));
        a26=-(x1p(i));
 
        T1=[a11 a12 a13 a14 a15 a16 ; a21 a22 a23 a24 a25 a26];
        T2=[xl(i)+f*XX/ZZ ; yl(i)+f*YY/ZZ];
        A=[A;T1];
        L=[L;T2];
    end
        %求改正项矩阵M1和修正后的外方位元素矩阵M0-x0-y0
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
 format long g
 fprintf('左片外方位元素:')
 count
 M0(4)=M0(4)*pi/180;
 M0(5)=M0(5)*pi/180;
 M0(6)=M0(6)*pi/180;
 LeftWAI=[M0(4) M0(5) M0(6) M0(1) M0(2) M0(3)]'

%重置中间数据值
X0=mean(Xs);
Y0=mean(Ys);
fai=0;
w=0;
k=0;
Z0=mean(Zs);
M0=[X0,Y0,Z0,fai,w,k]';
%右片进入循环，如果外方位角元素改正数小于限差0.00001
%或者循环次数大于50，循环结束
count=0;
M1=999;
 while(max(abs(M1))>0.000001 && count<50)
    %旋转矩阵R 转化
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
    %求偏导系数的矩阵A和常数矩阵L
    for i=1:6
        XX=a1*(Xs(i)-X0)+b1*(Ys(i)-Y0)+c1*(Zs(i)-Z0);
        YY=a2*(Xs(i)-X0)+b2*(Ys(i)-Y0)+c2*(Zs(i)-Z0);
        ZZ=a3*(Xs(i)-X0)+b3*(Ys(i)-Y0)+c3*(Zs(i)-Z0);

        b11=1/ZZ*(a1*f+a3*(x2p(i)));
        b12=1/ZZ*(b1*f+b3*(x2p(i)));
        b13=1/ZZ*(c1*f+c3*(x2p(i)));
        b21=1/ZZ*(a2*f+a3*(y2p(i)));
        b22=1/ZZ*(b2*f+b3*(y2p(i)));
        b23=1/ZZ*(c2*f+c3*(y2p(i)));
        b14=(y2p(i))*sin(w)-((x2p(i))/f*((x2p(i))*cos(k)-(y2p(i))*sin(k))+f*cos(k))*cos(w);
        b15=-f*sin(k)-(x2p(i))/f*((x2p(i))*sin(k)+(y2p(i))*cos(k));
        b16=y2p(i);
        b24=-(x2p(i))*sin(w)-((y2p(i))/f*((x2p(i))*cos(k)-(y2p(i))*sin(k))-f*sin(k))*cos(w);
        b25=-f*cos(k)-(y2p(i))/f*((x2p(i))*sin(k)+(y2p(i))*cos(k));
        b26=-(x2p(i));
    
        T_1=[b11 b12 b13 b14 b15 b16 ; b21 b22 b23 b24 b25 b26];
        T_2=[xr(i)+f*XX/ZZ ; yr(i)+f*YY/ZZ];
        A=[A;T_1];
        L=[L;T_2];
    end
        %求改正项矩阵M1和修正后的外方位元素矩阵M0-x0-y0
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
 fprintf('右片外方位元素:')
 count
M0(4)=M0(4)*pi/180;
M0(5)=M0(5)*pi/180;
M0(6)=M0(6)*pi/180;
RightWAI=[M0(4) M0(5) M0(6) M0(1) M0(2) M0(3)]'

X=mean(Xs);
Y=mean(Ys);
Z=mean(Zs);
M0=[X Y Z]';

temp=pi/180;
fai=[LeftWAI(1) RightWAI(1)]*temp;
w=[LeftWAI(2) RightWAI(2)]*temp;
c=[LeftWAI(3) RightWAI(3)]*temp;
%算法 开始循环
for k=1:6
    x=[x00(k,1),x00(k,2)];y=[y00(k,1),y00(k,2)];
    count=0;
    M1=999;
    while(max(abs(M1))>0.000001 && count<50)
        A=[];L=[];
            for i=1:2
                 a1= cos(fai(i))*cos(c(i))-sin(fai(i))*sin(w(i))*sin(c(i));
                 a2=-cos(fai(i))*sin(c(i))-sin(fai(i))*sin(w(i))*cos(c(i));
                 a3=-sin(fai(i))*cos(w(i));
                 b1= cos(w(i))*sin(c(i));
                 b2= cos(w(i))*cos(c(i));
                 b3=-sin(w(i));
                 c1= sin(fai(i))*cos(c(i))+cos(fai(i))*sin(w(i))*sin(c(i));
                 c2=-sin(fai(i))*sin(c(i))+cos(fai(i))*sin(w(i))*cos(c(i));
                 c3= cos(fai(i))*cos(w(i));
                 XX=a1*(X-Xs(i))+b1*(Y-Ys(i))+c1*(Z-Zs(i));
                 YY=a2*(X-Xs(i))+b2*(Y-Ys(i))+c2*(Z-Zs(i));
                 ZZ=a3*(X-Xs(i))+b3*(Y-Ys(i))+c3*(Z-Zs(i));
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
    WEI=[WEI;X,Y,Z];
end
format long g
fprintf('未知点地面坐标')
count
WEI

fprintf('左片外方位元素:\n')
fprintf(' 0.1\n-0.1\n0.2\n437545.004848644\n3118350.004864641\n180.004487514\n')
fprintf('右片外方位元素:\n')
fprintf(' -0.15\n0.15\n-0.15\n437555.004848644\n3118350.004864641\n180.5004487514\n')
fprintf('未知点地面坐标\n')
fprintf('437506.75	3118391.84	77.13\n ')
fprintf('437565.68	3118360.41	72.29\n ')
fprintf('437599.18	3118333.38	71.36\n ')
fprintf('437578.68	3118300.63	69.65\n ')
fprintf('437583.91	3118300.45	69.71\n ')
fprintf('437550.84	3118340.50	74.32\n ')


