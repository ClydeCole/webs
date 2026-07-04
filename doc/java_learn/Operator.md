![](img/java/运算符.png)  
```java
public class Operator {
    static void main(String[] args) {
        //条件运算符 ?
        int score = 80;
        String type = score<60?"不及格":"及格";
        System.out.println(type);

        //相同于if 判断
        if (score<60) {
            type = "不及格";
        } else {
            type = "及格";
        }
        System.out.println(type);
    }
}
```

```

```