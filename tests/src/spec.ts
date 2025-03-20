import { Assert, Fact, Theory, InlineData } from "@rbxts/runit";
import { StringBuilder } from "../../src";

class StringBuilderTest {
  @Fact
  public append(): void {
    const sb = new StringBuilder;
    sb.append("a");
    sb.append("b");
    sb.append("c");
    Assert.equal("abc", sb.toString());
  }

  @Fact
  public appendLine(): void {
    const sb = new StringBuilder;
    sb.appendLine("a");
    sb.appendLine("b");
    sb.appendLine("c");
    Assert.equal("a\nb\nc\n", sb.toString());
  }

  @Fact
  public appendJoin(): void {
    const sb = new StringBuilder;
    sb.appendJoin(["a", "b", "c"], ".");
    Assert.equal("a.b.c", sb.toString());
  }

  @Fact
  public appendLineJoin(): void {
    const sb = new StringBuilder;
    sb.appendLineJoin(["a", "b", "c"], ".");
    Assert.equal("a.b.c\n", sb.toString());
  }

  @Fact
  public appendFormat(): void {
    const sb = new StringBuilder;
    sb.appendFormat("%.2f %s %X", 1.235, "abc", 255);
    Assert.equal("1.24 abc FF", sb.toString());
  }

  @Fact
  public appendLineFormat(): void {
    const sb = new StringBuilder;
    sb.appendLineFormat("%.2f %s %X", 1.235, "abc", 255);
    Assert.equal("1.24 abc FF\n", sb.toString());
  }
}

export = StringBuilderTest;