#include <stdio.h>

void PrintN(int n);
int main()
{
    int n1;
    printf("请输入一个数字:\n");
    scanf("%d",&n1);
    PrintN(n1);
}
void PrintN(int n)
{
    for (int i = 1; i <= n; i++)
    {
        printf("%d\n",i);
    }
}