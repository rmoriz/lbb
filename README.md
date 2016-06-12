# lbb

## About

Automatically downloads all available PDF invoices for [LBB.de](https://www.lbb.de/) credit-cards (e.g. [Amazon VISA](https://kreditkarten-banking.lbb.de/Amazon/), AirBerlin and others) based on [nightmare](https://github.com/segmentio/Nightmare) and [electron](https://github.com/electron/electron).

## Installation

```shell
npm install -g lbb
```

(tested with npm LTS 4.4.5/npm 3.9.3)

## Usage

**general usage:**

```shell
ACCOUNT_LOGIN=430000000000 ACCOUNT_PASSWORD=password lbb ~/directory_where_to_store_files
```

**debug usage (opens electron window)**

```shell
DEBUG=1 ACCOUNT_LOGIN=430000000000 ACCOUNT_PASSWORD=password lbb ~/directory_where_to_store_files
```

## License

[MIT](https://opensource.org/licenses/MIT)

## Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
