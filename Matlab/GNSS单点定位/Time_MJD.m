function Result=Time_MJD(Year,Mon,Day,Hour,Min,Sec)
%����׼ʱ��ת����Ϊ�Ľ�������ʱ
%���ص���"��"Ϊ��λ


TH=Hour+Min/60.0+Sec/3600.0;  
if (Mon<=2)
    Year=Year-1;
    Mon=Mon+12;
end
Result=fix(365.25*Year+1.0e-9)+fix(30.6001*(Mon+1)+1.0e-9)+Day+TH/24+1720981.5;
Result=Result-2400000.5;       %�õ��Ľ�������ʱ  
return 
