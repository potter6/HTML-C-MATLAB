#include <stdio.h>
void Change(int m,int n);
int main()
{
    int m;
    int n;
    
    scanf("%d",&m);
    scanf("%d",&n);
    printf("m=%d,n=%d\n",m,n);

    Change(m,n);
    
    
    return 0;
}
    //每个函数有自己的变量空间，参数也位于这个独立空间中
    //和其他函数没有关系
void Change(int m,int n)
{
    int temp=n;
    n=m;
    m=temp;
    printf("m=%d,n=%d\n",m,n);
}