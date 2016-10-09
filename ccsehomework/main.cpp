#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
const int MAX_WORDS = 1000;
const int WORDS_LEN = 30;
struct my_count
{
    int row, num; //出现在哪一行 出现了几次
};
struct node {
    char word[WORDS_LEN]; //保存单词的信息
    struct my_count * count; //用结构体去存储行信息和出现在该行的次数
    int count_len;  //出现的在某一行的次数,用于计算pair
    int tot_num;    //出现的总共次数
    int is_appear;  //判断是否在某一行已经出现过
};

struct node * data;
int data_len;
int document_row; //一共多少行
int pair;

void init(); //读入并提取word
void do_it(); //处理单词频率
void calculate_pair(); //计算pair;
void free_pointer();
void ans_print();
void my_clear(); // 每个document都要清空is_appear

int main(int argc, const char * argv[]) {

    init();
    calculate_pair();
    ans_print();
    free_pointer();
    return 0;
}

void calculate_pair()
{
    for(int i = 0;i<data_len;i++)
        pair += data[i].count_len;
}
void free_pointer()
{
    for (int i = 0 ; i < data_len; i++)
        free(data[i].count);
    free(data);
}

void my_clear()
{
    for (int i = 0 ; i < data_len ; i++)
        data[i].is_appear = 0;
}

int cmp(const void *a ,const void *b)
{
    return strcmp((*(struct node *)a).word, (*(struct node *)b).word ) > 0? 1 : -1;
}

void ans_print()
{
    qsort(data,data_len,sizeof(struct node),cmp);
    printf("index has %d terms and %d (d,fdt) pairs\n", data_len, pair);
    for (int i = 0 ; i< 4 ; i++)
    {
        int p = (i<2)?i:(data_len-(i+1)% 2-1); //只需要输出整个单词的前两个和后两个,所以做一个长度为4的循环
        int len = data[p].count_len;
        printf("term %d is \"%s\":\n", p+1, data[p].word);
        for (int j = 0 ; j < len ; j++)
        {
            if(j == 0)
            {
                printf("%d,%d; ", data[p].count[j].row, data[p].count[j].num);
            }
            else
            {
                printf("%d,%d ", data[p].count[j].row, data[p].count[j].num);
            }
        }
        printf("\n");
    }
}
void do_it(char * str, int len,  int row)
{
    if (len == 0 ) return ;
    char word[WORDS_LEN] = "";
    for (int i = 0 ; i < len ; i++)
        word[i] = str[i];
    for (int i = 0 ; i < data_len; i++)
    {

        //判断这个单词是否出现过
        if (strcmp(data[i].word, word) == 0)
        {
            data[i].tot_num++;
            int len = data[i].count_len;

            //如果没有在这一行出现过
            if (data[i].is_appear == 0)
            {
                data[i].count_len++;
                data[i].count = (struct my_count*)realloc(data[i].count,data[i].count_len*sizeof(struct my_count));
                data[i].count[len].row = row;
                data[i].count[len].num = 1;
                data[i].is_appear = 1;
            }
            else
                //如果在这行出现过
            {
                data[i].count[len-1].num++;
            }
            return ;
        }
    }

    //遇到新的单词的初始化工作
    data_len++;
    data = (struct node *)realloc(data,data_len*sizeof(struct node));
    strcpy(data[data_len-1].word, word);
    data[data_len-1].tot_num = 1;
    data[data_len-1].is_appear = 1;
    data[data_len-1].count = NULL;
    data[data_len-1].count = (struct my_count*)realloc(data[data_len-1].count,sizeof(struct my_count));
    data[data_len-1].count_len = 1;
    data[data_len-1].count[0].row = row;
    data[data_len-1].count[0].num = 1;


}
void init()
{
    FILE *fpin;
    fpin = fopen("/Users/wangning/Desktop/ccsehomework/test0-ind.txt","r");
    while (!feof(fpin))
    {
        char document[MAX_WORDS] ="";
        fgets(document, MAX_WORDS, fpin);
        my_clear();
        document_row++;
        int len = strlen(document);
        int word_len = 0;
        char word[WORDS_LEN] = "";
        for (int i = 0 ; i < len ; i++)
        {

            if (isalpha(document[i]))
                word[word_len++] = document[i];
            else {
                do_it(word, word_len, document_row);
                word_len = 0;
            }
        }
        do_it(word, word_len, document_row);
    }

}
