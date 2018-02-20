//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import TestSetup from "./TestSetup";

// Defines a Mocha test suite to group tests of similar kind together
suite("C++ - Parameters Tests", () => {

    const testSetup: TestSetup = new TestSetup("void foo();");

    // Tests
    test("No parameters", () => {
        const result = testSetup.SetLine("void foo();").GetResult();
        assert.equal("/**\n * @brief \n * \n */", result);
    });

    test("Single parameter", () => {
        const result = testSetup.SetLine("void foo(int a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);
    });

    test("Multiple parameters", () => {
        const result = testSetup.SetLine("void foo(int a, int b, int c);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n * @param b \n * @param c \n */", result);
    });

    test("Parameters with numbers in them", () => {
        const result = testSetup.SetLine("void foo(int a1, int b23);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b23 \n */", result);
    });

    test("Reference parameter", () => {
        const result = testSetup.SetLine("void foo(int& a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);
    });

    test("Pointer parameter", () => {
        const result = testSetup.SetLine("void foo(int* a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);
    });

    test("Const parameter", () => {
        let result = testSetup.SetLine("void foo(const int a1);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n */", result);

        result = testSetup.SetLine("void foo(int const a1);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n */", result);
    });

    test("Struct parameter", () => {
        const result = testSetup.SetLine("void foo(int a1, int b23);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b23 \n */", result);
    });

    test("Template parameter", () => {
        const result = testSetup.SetLine("void foo(Matrix<T, N, M> mat);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param mat \n */", result);
    });

    test("Const parameter with const pointer to const pointer", () => {
        let result = testSetup.SetLine("void foo(const int * const * const a1);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n */", result);

        result = testSetup.SetLine("void foo(int const * const * const a1);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n */", result);
    });

    test("Fundamental return type with modifiers", () => {
        let result = testSetup.SetLine("void foo(unsigned int a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(unsigned short int a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(signed short a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(long a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(unsigned long long int a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(signed a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(unsigned a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(unsigned char a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(long double a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a \n */", result);

        result = testSetup.SetLine("void foo(long unsigned unsigned_a);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param unsigned_a \n */", result);
    });

    test("Parameter type in namespace", () => {
        const result = testSetup.SetLine("void foo(MyNamespace::Foo a1);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n */", result);
    });

    test("Parameter template type in namespace", () => {
        const result = testSetup.SetLine("void foo(Math::Matrix<A, B, C> mat);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param mat \n */", result);
    });

    test("Parameter template type within templated namespace", () => {
        const result = testSetup.SetLine("void foo(Matrix<A, B, C>::Matrix<A, B, C> mat);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param mat \n */", result);
    });

    test("Parameter type in nested namespacee", () => {
        const result = testSetup.SetLine("void foo( Math::LA::Matrix<A, B, C> mat);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param mat \n */", result);
    });

    test("Parameter with default char literal", () => {
        let result = testSetup.SetLine("void foo(char a1 = 'a', int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(char a1 = u'b', int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(char a1 = u8'b', int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(char a1 = U'a', int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(char a1 = l',', int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(int a1 = 'ab', int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);
    });

    test("Parameter with default string literal", () => {
        let result = testSetup.SetLine("void foo(std::string a1 = \"bar\", int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(std::string a1 = u\"bar, test\", int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(std::string a1 = u8\"bar\", int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(std::string a1 = U\"bar\", int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(std::string a1 = l\"bar\", int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(std::string a1 = R\"(bar\\t\\\")\", int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);
    });

    test("Parameter with default integer literal", () => {
        let result = testSetup.SetLine("void foo(int a1 = 1337, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(int a1 = 01337, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(int a1 = 1337, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(int a1 = 0x0FAB, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(int a1 = 0X0FAB, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(std::uint8_t a1 = 0b110011, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(std::byte a1 = 0B11111, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(long a1 = 1337l, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(long long a1 = 1337ll, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(unsigned long long a1 = 1337ull, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(long a1 = 1337L, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(long long a1 = 1337LL, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(unsigned long long a1 = 1337ULL, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);
    });

    test("Parameter with default floating point literal", () => {
        let result = testSetup.SetLine("void foo(double a1 = 1e10, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(double a1 = 1., int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(double a1 = .1, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(double a1 = 0.1e-1, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(float a1 = 1.0f, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(float a1 = 1.0F, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(long double a1 = 1.0lf, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(long double a1 = 1.0LF, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(double a1 = 0xa.bp10, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);

        result = testSetup.SetLine("void foo(double a1 = 0xa.bp10l, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);
    });

    test("Parameter with default compound literal", () => {
        const result = testSetup.SetLine("void foo(struct Bar a1 = {2, 3}, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);
    });

    test("Parameter with default template function call", () => {
        const result = testSetup.SetLine("void foo(struct Bar a1 = test::baz<3, 2, 5>(23), int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);
    });

    test("Parameter with default user defined literal.", () => {
        const result = testSetup.SetLine("void foo(double a1 = 0xa.bp10l_deg_test, int b);").GetResult();
        assert.equal("/**\n * @brief \n * \n * @param a1 \n * @param b \n */", result);
    });
});
