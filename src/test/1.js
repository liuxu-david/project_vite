const obj = {
    a: 0
};
obj['1'] = 0; //obj遇到数字类型的数据会自动提升
obj[++obj.a] = obj.a++; // ++a和a++的区别：++a是先+1然后赋值给a，a++是先赋值，然后再+1
const values = Object.values(obj);
obj[values[1]] = obj.a;
console.log(obj);