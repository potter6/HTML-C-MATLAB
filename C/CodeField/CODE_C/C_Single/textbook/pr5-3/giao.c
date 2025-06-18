/*本题要求实现函数输出n行数字金字塔。*/
/*其中n是用户传入的参数，为[1, 9]的正整数。
要求函数按照如样例所示的格式打印出n行数字金字塔。
注意每个数字后面跟一个空格。*/
#include <stdio.h>

void pyramid(int n)
{
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= n - 1; j++)
        {
            printf(" ");
        }
        for (int k = 1; k <= i; k++)
        {
            printf("%d ",i);
        }
        printf("\n");
    }
}

int main()
{
    int n;

    scanf("%d", &n);
    pyramid(n);

    return 0;
}