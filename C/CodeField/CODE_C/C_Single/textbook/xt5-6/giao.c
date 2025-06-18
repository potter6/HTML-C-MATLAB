/*使用函数输出水仙花数*/
/*水仙花数是指一个N位正整数（N≥3），它的每个位上的数字的N次幂之和等于它本身。
例如：153=13+53+3​3本题要求编写两个函数，一个判断给定整数是否水仙花数，
另一个按从小到大的顺序打印出给定区间(m,n)内所有的水仙花数。*/
#include <stdio.h>

int narcissistic( int number )
{
    if(number < 100) return 0;
    int s = 0,i = 0,x = number;
    int n = number < 1000?3:4;
    while(x)
    {
        i = x % 10;
        s += pow(i,n);//pow(x,a)=exp(a*log(x))
        x /= 10;
    }
    return s == number?1:0;
}

void PrintN( int m, int n )
{
    if(m < n)
    for(int i = m+1;i < n;i++)
    {
        if(narcissistic(i)) printf("%d\n",i);
    }
}

int main()
{
    int m, n;

    scanf("%d %d", &m, &n);
    if (narcissistic(m))
        printf("%d is a narcissistic number\n", m);
    PrintN(m, n);
    if (narcissistic(n))
        printf("%d is a narcissistic number\n", n);

    return 0;
}
/*输入样例：153 400
输出样例：
153 is a narcissistic number
370
371*/