function [rho,theta]=tran(x,y)
rho=sqrt(x*x+y*y);
theta=atan(y/x);

%x=input('Please input x=:');
%y=input('Please input y=:');
%[rho,theta]=tran(x,y);
%rho
%theta
