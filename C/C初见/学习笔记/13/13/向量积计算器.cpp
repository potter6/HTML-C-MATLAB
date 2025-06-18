#include<stdio.h>
#include<math.h>
void main()
{
	int a,b,c,d,e,f,i,j,k;
	printf("请输入第一个向量的三个数字： ");
	scanf("%d%d%d",&a,&b,&c);  
	printf("请输入第二个向量的三个数字： ");
	scanf("%d%d%d",&d,&e,&f);
	i=b*f-e*c;
	j=c*d-a*f;
	k=a*e-b*d;
	printf("结果为： (%d,%d,%d) \n或     =(%di)+(%dj)+(%dk)\n      (i,j,k均表示向量）\n",i,j,k,i,j,k);
}