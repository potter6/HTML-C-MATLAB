
d=[50 100 500 1000 1500 2000 2500];
d=d.'*1000;
a=1;
b=10^-6;
i=1;
z=1;
r=zeros(7,1);
mq=zeros(7,1);
ml=zeros(7,1);
while z<=7
    mq(z,:)=(1/206265)*d(z,:);
    ml(z,:)=sqrt(a^2+(b*d(z,:))^2);
    z=z+1;
end
while i<=7
    r(i,:)=mq(i,:)/ml(i,:);
    i=i+1;
end
d=d/1000;
x=1:0.1:3000;
y=((1/206265)*x*1000)./(sqrt(a.^2+(b*x*1000).^2));
plot(x,y);
axis([0,2500,0,10])
line([103.7,103.7],[0,5],'linestyle','-.','color','r');
line([452.9,452.9],[0,5],'linestyle','-.','color','g');
title('±ß½Ç¾«¶ÈÆ¥Åä·ÖÎö')
xlabel('¾àÀëS/m')
ylabel('ºáÏòÎó²îmq/mm ×ÝÏòÎó²îml/mm')


a=0.5;
q=5;
i=1;
z=1;
d0=200;
mh=zeros(9,9);
alpha=zeros(9,1);
d=zeros(9,1);
while i<=9
    alpha(i,:)=q*3600/206265;
    q=q+5;
    i=i+1;
end
i=1;
while i<=9
    d(i,:)=d0;
    d0=d0+100;
    i=i+1;
end
i=1;
while z<=9
    while i<=9
    mh(i,z)=sqrt((tan(alpha(i,1))*(2+2*0.001*d(z,1)))^2+((1000*d(z,1)*(sec(alpha(i,1)))^2)*(1/206265))^2+a);
    i=i+1;
    end
    i=1;
    z=z+1;
end
Y=round(mh,1);

