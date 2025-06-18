#include<math.h>
#include<stdio.h>
int main()
{
	double pi,sum=0,term,sign=1.0;
	int count=0,n=1;

	term=1.0;
	while(fabs(term)>=1e-4)
	{
		term=sign/n;
	    sum=sum+term;
	    count++;
	    sign=-sign;
	    n=n+2;
	}
	pi=sum*4;

	printf("pi=%f\n count=%d\n",pi,count);
	return 0;
}