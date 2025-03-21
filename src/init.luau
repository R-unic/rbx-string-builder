--!strict
--!native
local StringBuilder = {}

export type StringBuilder = {
  new: (initial: string?) -> StringBuilder;
  toString: (self: StringBuilder) -> string;
  append: (self: StringBuilder, text: string) -> StringBuilder;
  appendLine: (self: StringBuilder, text: string?) -> StringBuilder;
  appendLineFormat: (self: StringBuilder, format: string, ...{ number | string }) -> StringBuilder;
  appendFormat: (self: StringBuilder, format: string, ...{ number | string }) -> StringBuilder;
  appendJoin: (self: StringBuilder, strings: { string }, separator: string?) -> StringBuilder;
  appendLineJoin: (self: StringBuilder, strings: { string }, separator: string?) -> StringBuilder;
}

function StringBuilder.new(initial: string?): StringBuilder
  local self: StringBuilder = {}
  local parts: { string } = {}
  local cachedResult: string?
  if initial then
    table.insert(parts, initial)
  end

  function self:toString(): string
    if not cachedResult then
      cachedResult = table.concat(parts)
    end
    return cachedResult
  end

  function self:prepend(text: string): StringBuilder
    table.insert(parts, 1, text)
    cachedResult = nil
    return self
  end

  function self:prependLine(text: string?): StringBuilder
    if not text then
      text = ""
    end
    return self:prepend("\n"):prepend(text)
  end

  function self:append(text: string): StringBuilder
    table.insert(parts, text)
    cachedResult = nil
    return self
  end

  function self:appendLine(text: string?): StringBuilder
    if not text then
      text = ""
    end
    return self:append(text):append("\n")
  end

  function self:appendFormat(format: string, ...: {number | string}): StringBuilder
    return self:append(format:format(...))
  end

  function self:appendLineFormat(format: string, ...: {number | string}): StringBuilder
    return self:appendFormat(format, ...):appendLine()
  end

  function self:appendJoin(strings: { string }, separator: string?): StringBuilder
    if separator == nil then
      separator = ""
    end
    for i, string in strings do
      self:append(string)
      i += 1
      if i - 1 >= #strings then continue end
      self:append(separator)
    end
    return self
  end

  function self:appendLineJoin(strings: { string }, separator: string?): StringBuilder
    return self:appendJoin(strings, separator):appendLine()
  end

  setmetatable(self, {
    __tostring = self.toString
  })

  return self
end

return StringBuilder