#include<stdio.h>
#include<string.h>
int main()
{
    // const char han[]={"ling","yi","er","san","si","wu","liu","qi","ba","jiu"};
    // int number;
    // scanf("%d",&number);
    // if(number>=(-100000)&&number<=100000)
    // {
    //     //22345
    //     if(number<0)
    //     {
    //         number=-number;
    //     }
    //     int zu[5];
    //     zu[0]=number%10;//个位
    //     zu[1]=number%100/10;//十位
    //     zu[2]=number%1000/100;//百位
    //     zu[3]=number%10000/1000;//千位
    //     zu[4]=number%100000/10000;//万位
    //     zu[5]=number/100000;
    //     for (int i = 0; i <= 5; i++)
    //     {
    //         printf("%d ",zu[i]);
    //     }

    //     for (int i = 5; i >=0; i--)
    //     {
    //         printf("%d ",han[zu[i]]);
    //     }
    // }
    
    char str[20];
    const char *num[]={"ling","yi","er","san","si","wu","liu","qi","ba","jiu"};
    
    int i,k;
    scanf("%s",str);
    k=strlen(str);
    if(str[0]=='-')
    {
        printf("fu");
    }
    else
    {
        printf("%s",num[str[0]-'0']);
        for (int i = 1; i < k; i++)
        {
            printf(" %s",num[str[i]-'0']);
        }
        printf("\n");
    }   
    return 0;
}












// 你的程序要读入一个整数，
//范围是[-100000,100000]。
//然后，用汉语拼音将这个整数的每一位输出出来。

// 如输入1234，则输出：

// yi er san si

// 注意，每个字的拼音之间有一个空格，但是最后的字后面没有空格。当遇到负数时，在输出的开头加上“fu”，如-2341输出为：

// fu er san si yi



// 输入格式:

// 一个整数，范围是[-100000,100000]。



// 输出格式：

// 表示这个整数的每一位数字的汉语拼音，每一位数字的拼音之间以空格分隔，末尾没有空格。



// 输入样例：

// -30



// 输出样例：

// fu san ling