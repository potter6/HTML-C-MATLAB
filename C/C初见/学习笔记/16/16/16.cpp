#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <windows.h>
#include <time.h>
#include <string.h>


void HideCursor();          //���ع��
void gotoxy(int x, int y);  //��궨λ

#define R 26                //�ɻ�ÿ�����βx�������ֵ
#define N 20                //ͨ�ط���

int ax[3] = { 0 };          //�����ɻ�β���꣬ȫ��
int y[3] = { 3,7,11 };      //����y�ᣬȫ�֣����ȷ���ɻ���y��λ��   
                            //��Ϊ�ڵ��ķ��о�����һ�μ��������ӣ�Ϊ����ż��Ӧ�����y����붼��ż��
int i;                      //ѭ���ñ���
int fd[3];                  //���Ʒɻ�����

void cshcxhs()                              //��ʼ������
{
    system("title ��ɻ�С��Ϸ");           //����
    system("mode con cols=100 lines=30");   //��100����30
    HideCursor();                           //�������

    gotoxy(46, 12);                         //������Ϸ����
    printf("��Ϸ����");
    gotoxy(36, 14);
    printf("w a d�����Ʒ��򣬿ո�������ڵ�");
    gotoxy(26, 16);
    printf("���ео��ɻ� |---0> ��һ�֣������Ѿ��ɻ� >>>>>> ��һ��");
    gotoxy(40, 18);
    printf("�ۼƵ÷� %d ������Ϸ", N);
    Sleep(2800);

    system("cls");

    int k;                                  //ѭ���ñ���
    gotoxy(40, R);                          //��ʼ����̨
    for (k = 0; k < 17; k++)
        printf("_");

    gotoxy(46, R);
    printf("[_O_]");
    gotoxy(48, 25);                         //�м�x��48
    printf("|");

    int j;
    srand((unsigned)time(NULL));            //��ʼ���������
    for (j = 0; j < 3; j++)                 //��ʼ���ɻ��ĳ�ʼx���꣬д��ѭ��֮��
    {
        ax[j] = rand() % R;
        fd[j] = rand() % 2;
    }

    gotoxy(0, R);
    printf("  �÷֣�");                    //����x����9
}

void hcfjhs()                       //�����ɻ�����
{
    gotoxy(ax[i], y[i]);            //�����ڷɻ�β��������ܷɻ�

    if (fd[i] == 1)
        printf("|---0>");
    else
        printf(">>>>>>");

    gotoxy(ax[i] - 1, y[i]);        //����ɻ�β�����µĺۼ�
    printf(" ");

    ax[i]++;                        //Ȼ��ɻ�β�����������´��Էɻ�β������ܷɻ�
}

void dhpdxshs()                    //�����ɻ������÷ɻ��ڷɹ�x94��ʱ����ʧ
{
    for (i = 0; i < 3; i++)         //ÿ�ܷɻ�����һ��
    {
        hcfjhs();

        if (ax[i] + 6 >= 94)        //�ж�ÿ�ܷɻ�ͷ��û�г���94
        {
            gotoxy(94, y[i]);       //����������ÿ�ܷɻ���94������ո�
            printf("      ");
            if (ax[i] + 6 > 100)      //ÿ�ܷɻ��ķɻ�ͷ����100��������һ�������
            {
                ax[i] = rand() % R; //�޸�ΪС��R�������
                fd[i] = rand() % 2;
            }
        }
    }
}

int da = 2;           //da = 1Ϊ���� Ĭ���м� ��̨����ȫ�ֱ���
int yip = 0;          //�Ƿ��ڣ�0������1��2��3��������
int rtde = 1;         //�Ƿ�����ϣ�����ȴ��ڵ��������


int shells_x;         //�ڵ�����
int shells_y;

void ckkzhs()
{
    char ch;
    ch = _getch();

    if (ch == 'd' || ch == 'D')
    {
        gotoxy(49, 25);
        printf("/");                //��̨��ת
        gotoxy(47, 25);
        printf("  ");
        da = 3;                     //����״̬
    }
    if (ch == 'A' || ch == 'a')
    {
        gotoxy(47, 25);
        printf("\\");               //ת��ת���ַ�
        gotoxy(48, 25);
        printf("  ");
        da = 1;                     //����״̬
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

    if (ch == ' ' && rtde == 0)      //���ڴ��ڷ������״̬���Ұ��¿ո�
    {
        if (da == 2)                //��  ��̨����
            yip = 2;

        if (da == 1)                //��
        {
            yip = 1;
            shells_x = 45;          //��ʼ���ڵ�������
        }
        if (da == 3)                //��
        {
            yip = 3;
            shells_x = 51;
        }
        shells_y = 23;             //��ʼ���ڵ�������
    }
}

void dpfshs()                       //��������ͬ�������ڵ�
{
    rtde = 1;                       //ѭ�����ڵ��ƶ�ʱ����δ�������
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

    if (shells_y <= 1)         //�ڵ�Խ�磬�����ڵ�
    {
        yip = 0;               //�ڵ�Խ�磬�ڵ�ͣ��
        gotoxy(48, 1);         //������
        printf(" ");
        gotoxy(23, 1);
        printf(" ");
        gotoxy(73, 1);
        printf(" ");
        rtde = 0;             //�ڵ�Խ�磬������ϣ��ɽ�����һ�ֿ���
    }
}

int score;                  //�÷�

void pdfsjzhs()             //�ж��Ƿ���к�ͳ����Ϣ
{

    for (i = 0; i < 3; i++)
    {
        if (shells_x >= ax[i] && shells_x <= ax[i] + 6 && shells_y == y[i])//����ʱ
        {
            if (fd[i] == 1)
                score++;                        //����һ�Σ��÷ּ�һ
            else
            {
                score--;
                if (score <= 0)
                    score = 0;
            }

            rtde = 0;                       //����ʱ���������

            gotoxy(ax[i] - 1, y[i]);          //���к���ԭ�ɻ�β�ʹ������ɻ�
            printf("      ");

            ax[i] = rand() % R;             //�޸�ΪС��10�������
            fd[i] = rand() % 2;             //�ɻ����෢���仯

            gotoxy(shells_x, shells_y);     //�ڻ��зɻ��ĵط�����ո������ڵ�ʬ��
            printf(" ");

            shells_x = 0, shells_y = 0;     //�ڵ����зɻ����ڵ�Խ�磬��һ�οո��Զ���ʼ���ڵ�
        }
    }

    gotoxy(9, R);
    printf("%d", score);

    if (score >= N)         //��Ϸ�����ж�
    {
        system("cls");      //����
        gotoxy(39, 15);
        printf("��ͨ���ˣ����յ÷֣�%d !", N);
        gotoxy(0, 29);
        exit(0);
    }

}

void process()              //����
{
    while (1)
    {
        dhpdxshs();         //�ɻ���������

        if (_kbhit())
        {
            ckkzhs();       //��������
        }

        dpfshs();           //����Ч������
        pdfsjzhs();         //�ж��Ƿ���к�ͳ����Ϣ

        Sleep(18);
    }
}

int main()
{
    cshcxhs();      //��ʼ������

    process();      //����

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