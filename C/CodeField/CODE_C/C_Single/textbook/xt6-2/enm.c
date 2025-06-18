#include <stdio.h>
/*给定两个均不超过9的正整数a和n，要求编写函数求a+aa+aaa++⋯+aa⋯a（n个a）之和。*/
// int fn(int a, int n)
// {
//     int num;
//     for (int i = 1; i <= n; i++)
//     {
//         num *= a;
//     }
//     return num;
// }
// int SumA(int a, int n)
// {
//     int sum;
//     sum += fn(a, n);
//     return sum;
// }
int fn(int a,int n)
{
    if(n == 1) return a;
    int sum = a;
    for(int i = 2;i<=n;i++)
    {
        sum = sum*10 + a;
    }
    return sum;
}

int SumA( int a, int n )
{
    int sum = 0;
    for(int i = 1;i <= n;i++)
    {
        sum += fn(a,i);
    }
    return sum;
}
int main()
{
    int a, n;

    scanf("%d %d", &a, &n);
    printf("fn(%d, %d) = %d\n", a, n, fn(a, n));
    printf("s = %d\n", SumA(a, n));

    return 0;
}
/*输入样例：
2 3
输出样例：
fn(2, 3) = 222
s = 246
*/