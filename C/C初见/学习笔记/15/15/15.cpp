#include<stdio.h>
int main()
{
	int k=0,i;
	float s[100],ave,sum=0;
	for(i=0;i<100;i++)
	{
	 scanf("%f",&s[i]);
	 sum=sum+s[i];
	 ave=sum/100;
	   for(i=0;i<100;i++)
		if(s[i]>ave)k++;
	}
	   return 0;
}