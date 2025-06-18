function Obs_dat=read_epoch_obs(Num_ObsType,ObsType,line,DetaT)
%Let the all observables of one satellite store into corresponding variables
%input:
%       Num_ObsType: the number of observation
%       ObsType:     a vector used to store the type of observation
%       line:        a string, store the all observables of one satellite
%       DeteT:       the clock error, used to correct the observables
%output:
%       Obs_dat:the observation of different type


LightSpeed=299792458.0;  %the ratio of the light speed;
Freq1=1575.42e+6;        %L1 and L2 frequencies
Freq2=1227.60e+6;
%Obs_dat(1)=L1;Obs_dat(2)=L2;Obs_dat(3)=C1;Obs_dat(4)=P1;Obs_dat(5)=P2;

%if(length(line)<80) line=[line blanks(80-length(line))]; end;

Obs_dat(1:5)=0.0;
for i=1:Num_ObsType
    ii=16*(i-1)+2;
    tempstr=str2num(line(ii:ii+12));  %aviod the blank string,because the function can't process the blank string
    switch ObsType(i) %1-L1;2-L2;3-C1;4-P1;5-P2;6-D1;7-D2
        case 3
            if(isempty(tempstr)||tempstr==0) 
                Obs_dat(3)=0;
            else
                Obs_dat(3)=tempstr-LightSpeed*DetaT;;
            end
        case 4
            if(isempty(tempstr)||tempstr==0) 
                Obs_dat(4)=0;
            else
                Obs_dat(4)=tempstr-LightSpeed*DetaT;
            end
        case 5
            if(isempty(tempstr)||tempstr==0) 
                Obs_dat(5)=0;
            else
                Obs_dat(5)=tempstr-LightSpeed*DetaT; 
            end
        case 1
            if(isempty(tempstr)||tempstr==0) 
                Obs_dat(1)=0;
            else
                Obs_dat(1)=tempstr-Freq1*DetaT; 
            end
        case 2
            if(isempty(tempstr)||tempstr==0) 
                Obs_dat(2)=0;
            else
                Obs_dat(2)=tempstr-Freq1*DetaT; 
            end
    end
end
		
	
		