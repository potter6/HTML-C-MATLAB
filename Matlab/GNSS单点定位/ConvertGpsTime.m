function gpsweeksec=ConvertGpsTime(year,month,day,hour,minute,second)

format long g;
dinmth=[31,28,31,30,31,30,31,31,30,31,30,31];

%%���㵱�������
dayofy=0;
if(year<1981||month<1||month>12||day <1||day> 31)
	weekno=0;

else
	dayofy=0;
end

if(month==1)
    dayofy=day;
    
else  
    for m=1:(month-1)
        dayofy=dayofy+dinmth(m);
			
        if(m==2)			
		   if(rem(year,4)==0&&rem(year,100)~= 0||rem(year,400)==0)
			  dayofy=dayofy+1;
           end
        end                
    end
	dayofy=dayofy+day;
end

%������GPS��ʼʱ�������
%ת�����ܺ�����

ttlday = 360;            %GPSϵͳ��ʼʱ��1980��1��6��(������)0ʱ
	
    for yr=1981:(year-1)
        
		ttlday=ttlday+365;
		if(rem(yr,4)==0&&rem(yr,100)~= 0||rem(yr,400)==0)
			ttlday=ttlday+ 1;  
        end
        
    end
    
    ttlday = ttlday+dayofy
    weekno = fix(ttlday/7) %GPS����

    dayofw = ttlday-7*weekno;

    weeksec = (hour*3600+minute*60+second+dayofw*86400);    %�ܵļ����Ǵ����������㣬��������ʱ
    gpsweeknum=weekno;
       toallSec=weekno*86400*7+ weeksec
    gpsweeksec=weeksec;
  
	