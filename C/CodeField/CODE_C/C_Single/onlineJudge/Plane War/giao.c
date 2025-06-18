#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <windows.h>
#include <time.h>
#include <string.h>


void HideCursor();          //隐藏光标
void gotoxy(int x, int y);  //光标定位

#define R 26                //飞机每次随机尾x坐标最大值
#define N 20                //通关分数

int ax[3] = { 0 };          //三个飞机尾坐标，全局
int y[3] = { 3,7,11 };      //三个y轴，全局，查表法确定飞机的y轴位置   
                            //因为炮弹的飞行距离是一次加两个格子，为了奇偶对应这里的y轴必须都是偶数
int i;                      //循环用变量
int fd[3];                  //控制飞机种类

void cshcxhs()                              //初始化函数
{
    system("title 打飞机小游戏");           //标题
    system("mode con cols=100 lines=30");   //宽100，高30
    HideCursor();                           //光标隐藏

    gotoxy(46, 12);                         //介绍游戏规则
    printf("游戏规则：");
    gotoxy(36, 14);
    printf("w a d键控制方向，空格键发射炮弹");
    gotoxy(26, 16);
    printf("击中敌军飞机 |---0> 加一分，击中友军飞机 >>>>>> 减一分");
    gotoxy(40, 18);
    printf("累计得分 %d 结束游戏", N);
    Sleep(2800);

    system("cls");

    int k;                                  //循环用变量
    gotoxy(40, R);                          //初始化炮台
    for (k = 0; k < 17; k++)
        printf("_");

    gotoxy(46, R);
    printf("[_O_]");
    gotoxy(48, 25);                         //中间x：48
    printf("|");

    int j;
    srand((unsigned)time(NULL));            //初始化随机种子
    for (j = 0; j < 3; j++)                 //初始化飞机的初始x坐标，写在循环之外
    {
        ax[j] = rand() % R;
        fd[j] = rand() % 2;
    }

    gotoxy(0, R);
    printf("  得分：");                    //分数x坐标9
}

void hcfjhs()                       //画出飞机函数
{
    gotoxy(ax[i], y[i]);            //首先在飞机尾处输出整架飞机

    if (fd[i] == 1)
        printf("|---0>");
    else
        printf(">>>>>>");

    gotoxy(ax[i] - 1, y[i]);        //清除飞机尾部留下的痕迹
    printf(" ");

    ax[i]++;                        //然后飞机尾坐标自增，下次自飞机尾输出整架飞机
}

void dhpdxshs()                    //画出飞机，并让飞机在飞过x94的时候消失
{
    for (i = 0; i < 3; i++)         //每架飞机都走一步
    {
        hcfjhs();

        if (ax[i] + 6 >= 94)        //判断每架飞机头有没有超过94
        {
            gotoxy(94, y[i]);       //满足条件在每架飞机的94处输出空格
            printf("      ");
            if (ax[i] + 6 > 100)      //每架飞机的飞机头超过100，则重置一个随机数
            {
                ax[i] = rand() % R; //修改为小于R的随机数
                fd[i] = rand() % 2;
            }
        }
    }
}

int da = 2;           //da = 1为最左 默认中间 炮台方向，全局变量
int yip = 0;          //是否开炮，0不开，1，2，3三个方向
int rtde = 1;         //是否发射完毕，必须等待炮弹发射完成


int shells_x;         //炮弹坐标
int shells_y;

void ckkzhs()
{
    char ch;
    ch = _getch();

    if (ch == 'd' || ch == 'D')
    {
        gotoxy(49, 25);
        printf("/");                //炮台右转
        gotoxy(47, 25);
        printf("  ");
        da = 3;                     //最右状态
    }
    if (ch == 'A' || ch == 'a')
    {
        gotoxy(47, 25);
        printf("\\");               //转义转义字符
        gotoxy(48, 25);
        printf("  ");
        da = 1;                     //最左状态
    }
    if (ch == 'W' || ch == 'w')
    {
        gotoxy(48, 25);
        printf("|");
        gotoxy(47, 25);
        printf(" ");
        gotoxy(49, 25);
        printf(" ");
        da = 2;
    }

    if (ch == ' ' && rtde == 0)      //大炮处于发射完毕状态，且按下空格
    {
        if (da == 2)                //中  炮台朝向
            yip = 2;

        if (da == 1)                //左
        {
            yip = 1;
            shells_x = 45;          //初始化炮弹的坐标
        }
        if (da == 3)                //右
        {
            yip = 3;
            shells_x = 51;
        }
        shells_y = 23;             //初始化炮弹的坐标
    }
}

void dpfshs()                       //向三个不同方向发射炮弹
{
    rtde = 1;                       //循环，炮弹移动时代表未开炮完毕
    if (yip == 2)
    {
        shells_x = 48;
        gotoxy(shells_x, shells_y -= 2);
        printf("o");
        gotoxy(shells_x, shells_y + 2);
        printf(" ");
    }
    if (yip == 1)
    {
        gotoxy(shells_x -= 2, shells_y -= 2);
        printf("o");
        gotoxy(shells_x + 2, shells_y + 2);
        printf(" ");
    }
    if (yip == 3)
    {
        gotoxy(shells_x += 2, shells_y -= 2);
        printf("o");
        gotoxy(shells_x - 2, shells_y + 2);
        printf(" ");
    }

    if (shells_y <= 1)         //炮弹越界，消除炮弹
    {
        yip = 0;               //炮弹越界，炮弹停下
        gotoxy(48, 1);         //并消除
        printf(" ");
        gotoxy(23, 1);
        printf(" ");
        gotoxy(73, 1);
        printf(" ");
        rtde = 0;             //炮弹越界，开炮完毕，可进行下一轮开炮
    }
}

int score;                  //得分

void pdfsjzhs()             //判断是否击中和统计信息
{

    for (i = 0; i < 3; i++)
    {
        if (shells_x >= ax[i] && shells_x <= ax[i] + 6 && shells_y == y[i])//击中时
        {
            if (fd[i] == 1)
                score++;                        //击中一次，得分加一
            else
            {
                score--;
                if (score <= 0)
                    score = 0;
            }

            rtde = 0;                       //击中时，开炮完成

            gotoxy(ax[i] - 1, y[i]);          //击中后，在原飞机尾巴处消除飞机
            printf("      ");

            ax[i] = rand() % R;             //修改为小于10的随机数
            fd[i] = rand() % 2;             //飞机种类发生变化

            gotoxy(shells_x, shells_y);     //在击中飞机的地方输出空格消除炮弹尸体
            printf(" ");

            shells_x = 0, shells_y = 0;     //炮弹击中飞机，炮弹越界，下一次空格将自动初始化炮弹
        }
    }

    gotoxy(9, R);
    printf("%d", score);

    if (score >= N)         //游戏结束判断
    {
        system("cls");      //清屏
        gotoxy(39, 15);
        printf("您通关了，最终得分：%d !", N);
        gotoxy(0, 29);
        exit(0);
    }

}

void process()              //流程
{
    while (1)
    {
        dhpdxshs();         //飞机动画函数

        if (_kbhit())
        {
            ckkzhs();       //操作函数
        }

        dpfshs();           //大炮效果函数
        pdfsjzhs();         //判断是否击中和统计信息

        Sleep(18);
    }
}

int main()
{
    cshcxhs();      //初始化程序

    process();      //流程

    return 0;
}




void HideCursor()
{
    CONSOLE_CURSOR_INFO cursor_info = { 1, 0 };
    SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE), &cursor_info);
}

void gotoxy(int x, int y)
{
    COORD pos = { x,y };
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), pos);
}