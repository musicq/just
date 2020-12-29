#!/usr/bin/env node
import {main} from '../src/main'

const [, , ...args] = process.argv

main(...args)
