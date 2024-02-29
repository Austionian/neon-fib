use neon::prelude::*;
use num_bigint::BigInt;

fn fib(n: usize) -> BigInt {
    if n == 1 || n == 2 {
        return 1.into();
    }
    let mut bottom_up: Vec<BigInt> = vec![0.into(); n + 1];
    bottom_up[1] = 1.into();
    bottom_up[2] = 1.into();
    for i in 3..n + 1 {
        bottom_up[i] = bottom_up[i - 2].clone() + bottom_up[i - 1].clone();
    }
    bottom_up[n].clone()
}

fn get_fib(mut cx: FunctionContext) -> JsResult<JsString> {
    let n = cx.argument::<JsNumber>(0)?.value(&mut cx);
    let n = fib(n as usize);

    Ok(cx.string(n.to_string()))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("fib", get_fib)?;
    Ok(())
}
