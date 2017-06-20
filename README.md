# casperjs-loadtest

casperjs-loadtest provides a simple way to launch multiple PhantomJS instances in parallel to run a simple load test on your site.

## Installation

Install via npm:

    $ npm install -g casperjs-loadtest

You'll also need CasperJS, which you can install via Homebrew:

    $ brew install casperjs --devel

## Usage

To run a basic load test, just supply the name of a CasperJS script to run:

    $ DEBUG=* casperjs-loadtest --file=sample.js

This will run the specified CasperJS script once in PhantomJS instance.

### Parameters

You can specify sample size with the `-s` flag, and level of concurrency with the `-c` flag.

    $ DEBUG=* casperjs-loadtest -s 100 -c 25 --file=sample.js
    
This will run a total of 100 runs through the specified CasperJS script across 25 concurrent PhantomJS instances.
    

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Thanks

Thanks to https://github.com/nmeans/phantomherd for concept.