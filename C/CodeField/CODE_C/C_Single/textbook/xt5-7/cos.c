/* 使用函数求余弦函数的近似值
精确到最后一项的绝对值小于e：
cos(x)=x0 /0!−x​2 /2!+x4 /4!−x6 /6!+⋯
输入样例：0.01 -3.14
输出样例：cos(-3.14) = -0.999899 */
#include <stdio.h>
#include <math.h>
double funcos(double e, double x)
{
    double sum = 0, i = 0, sign = 1, jc = 1, tmp = 0;
    while (1)//死循环
    {
        tmp = pow(x,2*i)/jc;//每一项的表示
        sum += sign*tmp;//将每一项加起来    
        if (tmp < e) return sum;//判断醉胡一项是否小于精度e
        i++;//i自增
        jc = jc*2*i*(2*i-1);//分母求偶数阶乘(好家伙)一项等于后一偶数项乘以中间奇数项
        sign = -sign;//正负交替
    }
}
int main()
{
    double e, x;
    scanf("%lf %lf", &e, &x);
    printf("cos(%.2f) = %.6f\n", x, funcos(e, x));
    return 0;
}