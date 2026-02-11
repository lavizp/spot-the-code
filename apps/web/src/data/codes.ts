export const CODE_SNIPPETS = {
  "javascript": [
      "function greet(name) {\n  const message = `Hello, ${name}!`;\n  console.log(message);\n  return message;\n}\n\nconst users = ['Alice', 'Bob'];\nusers.forEach(user => {\n  greet(user);\n});\n// Generated comment\nif (true) {\n  let temp = 10;\n}",
      "const fs = require('fs');\n\nfs.readFile('data.txt', 'utf8', (err, data) => {\n  if (err) {\n    console.error(err);\n    return;\n  }\n  console.log(data);\n});\n\n// Dummy function\nfunction processData(input) {\n  return input.split('').reverse().join('');\n}",
      "class User {\n  constructor(name) {\n    this.name = name;\n  }\n  sayHi() {\n    console.log(this.name);\n  }\n}\n\nlet user = new User('John');\nuser.sayHi();\n\nconst array = [1, 2, 3];\nconst mapped = array.map(x => x * 2);",
      "async function fetchData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n\nfetchData();",
      "const button = document.getElementById('myButton');\nbutton.addEventListener('click', () => {\n  alert('Button clicked!');\n});\n\nconst obj = { a: 1, b: 2 };\nconst { a, b } = obj;\nconsole.log(a + b);",
      "// IIFE\n(function() {\n  console.log('Immediately invoked');\n})();\n\nconst promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('done'), 1000);\n});\n\npromise.then(result => console.log(result));",
      "const set = new Set([1, 2, 2, 3]);\nconsole.log(set.size); // 3\n\nconst map = new Map();\nmap.set('key', 'value');\n\nfor (let [key, value] of map) {\n  console.log(`${key} = ${value}`);\n}",
      "function* generator() {\n  yield 1;\n  yield 2;\n  return 3;\n}\n\nconst gen = generator();\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);",
      "// Proxy example\nconst target = { message: 'hello' };\nconst handler = {\n  get: (target, prop) => {\n    return prop in target ? target[prop] : 'Not found';\n  }\n};\nconst proxy = new Proxy(target, handler);\nconsole.log(proxy.message);",
      "const arr = [1, 2, 3, 4, 5];\nconst sum = arr.reduce((acc, curr) => acc + curr, 0);\nconsole.log(sum);\n\nconst filtered = arr.filter(num => num > 3);\nconsole.log(filtered);"
    ],
    "python": [
      "def calculate_area(radius):\n    import math\n    if radius < 0:\n        return 0\n    return math.pi * (radius ** 2)\n\ncircle_radius = 5\narea = calculate_area(circle_radius)\nprint(f'Area: {area}')\n# End of script",
      "import os\n\ndef list_files(directory):\n    for filename in os.listdir(directory):\n        print(filename)\n\nif __name__ == '__main__':\n    list_files('.')\n    # Dummmy logic\n    x = [i for i in range(10) if i % 2 == 0]",
      "class Dog:\n    def __init__(self, name):\n        self.name = name\n    \n    def bark(self):\n        return 'Woof!'\n\nmy_dog = Dog('Buddy')\nprint(my_dog.bark())",
      "try:\n    with open('file.txt', 'r') as f:\n        content = f.read()\nexcept FileNotFoundError:\n    print('File not found')\n\nmy_list = [1, 2, 3]\nmy_list.append(4)",
      "def decorator(func):\n    def wrapper():\n        print('Before')\n        func()\n        print('After')\n    return wrapper\n\n@decorator\ndef say_hello():\n    print('Hello')",
      "data = {'a': 1, 'b': 2}\nfor key, value in data.items():\n    print(f'{key}: {value}')\n\n# List comprehension\nnames = ['alice', 'bob']\nupper_names = [name.upper() for name in names]",
      "import random\n\ndef get_random_number():\n    return random.randint(1, 100)\n\nnumbers = [get_random_number() for _ in range(5)]\nprint(sum(numbers))",
      "def generator_func():\n    for i in range(3):\n        yield i\n\nfor val in generator_func():\n    print(val)\n\n# Context manager\nwith open('output.txt', 'w') as f:\n    f.write('hello')",
      "class A:\n    pass\n\nclass B(A):\n    def __init__(self, val):\n        self.val = val\n\nobj = B(10)\nprint(isinstance(obj, A))",
      "import json\n\ndata = {'name': 'Alice', 'age': 30}\njson_string = json.dumps(data)\nprint(json_string)\n\n# String manipulation\ntext = 'hello world'\nprint(text.title())"
    ],
    "cpp": [
      "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3};\n    for (int n : nums) {\n        std::cout << n << \" \";\n    }\n    std::cout << std::endl;\n    return 0;\n}",
      "#include <string>\n#include <algorithm>\n\nstd::string reverseString(std::string str) {\n    std::reverse(str.begin(), str.end());\n    return str;\n}\n\n// Main function\nint main() {\n    return 0;\n}",
      "#include <iostream>\n\nclass Person {\npublic:\n    std::string name;\n    Person(std::string n) : name(n) {}\n    void sayHello() {\n        std::cout << \"Hello, \" << name << std::endl;\n    }\n};\n\nint main() {\n    Person p(\"Alice\");\n    p.sayHello();\n    return 0;\n}",
      "#include <iostream>\n#include <cmath>\n\ntemplate <typename T>\nT square(T x) {\n    return x * x;\n}\n\nint main() {\n    std::cout << square<int>(5) << std::endl;\n    std::cout << square<double>(3.5) << std::endl;\n    return 0;\n}",
      "#include <iostream>\n#include <map>\n\nint main() {\n    std::map<std::string, int> ages;\n    ages[\"Alice\"] = 30;\n    ages[\"Bob\"] = 25;\n    \n    for (auto const& [key, val] : ages) {\n        std::cout << key << \" is \" << val << std::endl;\n    }\n    return 0;\n}",
      "#include <iostream>\n#include <memory>\n\nint main() {\n    std::unique_ptr<int> ptr = std::make_unique<int>(10);\n    std::cout << *ptr << std::endl;\n    // Automatically deleted\n    return 0;\n}",
      "#include <iostream>\n#include <vector>\n#include <numeric>\n\nint main() {\n    std::vector<int> v = {1, 2, 3, 4, 5};\n    int sum = std::accumulate(v.begin(), v.end(), 0);\n    std::cout << sum << std::endl;\n    return 0;\n}",
      "#include <iostream>\n#include <fstream>\n\nint main() {\n    std::ofstream outfile(\"test.txt\");\n    outfile << \"Hello File!\" << std::endl;\n    outfile.close();\n    return 0;\n}",
      "#include <iostream>\n#include <functional>\n\nint main() {\n    auto add = [](int a, int b) {\n        return a + b;\n    };\n    std::cout << add(3, 4) << std::endl;\n    return 0;\n}",
      "#include <iostream>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    std::cout << factorial(5) << std::endl;\n    return 0;\n}"
    ],
    "rust": [
      "fn main() {\n    let name = \"World\";\n    println!(\"Hello, {}!\", name);\n    \n    let mut count = 0;\n    while count < 5 {\n        count += 1;\n    }\n    println!(\"Count: {}\", count);\n}",
      "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n\nfn main() {\n    let sum = add(5, 10);\n    println!(\"Sum: {}\", sum);\n}",
      "struct User {\n    username: String,\n    active: bool,\n}\n\nfn main() {\n    let user1 = User {\n        username: String::from(\"user1\"),\n        active: true,\n    };\n    println!(\"User: {}\", user1.username);\n}",
      "fn main() {\n    let v = vec![1, 2, 3];\n    for i in &v {\n        println!(\"{}\", i);\n    }\n}",
      "enum Direction {\n    North,\n    South,\n}\n\nfn main() {\n    let d = Direction::North;\n    match d {\n        Direction::North => println!(\"Going North\"),\n        Direction::South => println!(\"Going South\"),\n    }\n}",
      "fn main() {\n    let s = String::from(\"hello\");\n    let len = calculate_length(&s);\n    println!(\"Length: {}\", len);\n}\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}",
      "fn main() {\n    let numbers = vec![1, 2, 3];\n    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();\n    println!(\"{:?}\", doubled);\n}",
      "fn main() {\n    let mut map = std::collections::HashMap::new();\n    map.insert(\"key\", 10);\n    println!(\"{:?}\", map.get(\"key\"));\n}",
      "fn main() {\n    let result = Some(5);\n    match result {\n        Some(i) => println!(\"Value: {}\", i),\n        None => println!(\"No value\"),\n    }\n}",
      "fn main() {\n    let mut x = 5;\n    let y = &mut x;\n    *y += 1;\n    println!(\"{}\", x);\n}"
    ],
    "go": [
      "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n    \n    for i := 0; i < 5; i++ {\n        fmt.Println(i)\n    }\n}",
      "package main\n\nimport \"fmt\"\n\nfunc add(a int, b int) int {\n    return a + b\n}\n\nfunc main() {\n    result := add(10, 20)\n    fmt.Println(result)\n}",
      "package main\n\nimport \"fmt\"\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc main() {\n    p := Person{Name: \"Alice\", Age: 30}\n    fmt.Println(p.Name)\n}",
      "package main\n\nimport \"fmt\"\n\nfunc main() {\n    arr := []int{1, 2, 3}\n    for i, v := range arr {\n        fmt.Printf(\"%d: %d\\n\", i, v)\n    }\n}",
      "package main\n\nimport \"fmt\"\n\nfunc main() {\n    m := make(map[string]int)\n    m[\"key\"] = 1\n    fmt.Println(m[\"key\"])\n}",
      "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 10\n    ptr := &x\n    fmt.Println(*ptr)\n    *ptr = 20\n    fmt.Println(x)\n}",
      "package main\n\nimport \"fmt\"\n\nfunc swap(a, b string) (string, string) {\n    return b, a\n}\n\nfunc main() {\n    a, b := swap(\"hello\", \"world\")\n    fmt.Println(a, b)\n}",
      "package main\n\nimport \"fmt\"\n\ntype Shape interface {\n    Area() float64\n}\n\ntype Circle struct {\n    Radius float64\n}\n\nfunc (c Circle) Area() float64 {\n    return 3.14 * c.Radius * c.Radius\n}\n\nfunc main() {\n    c := Circle{Radius: 5}\n    fmt.Println(c.Area())\n}",
      "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    go func() {\n        fmt.Println(\"goroutine\")\n    }()\n    time.Sleep(time.Second)\n}",
      "package main\n\nimport \"fmt\"\n\nfunc main() {\n    defer fmt.Println(\"Deferred\")\n    fmt.Println(\"Main\")\n}"
    ]
}