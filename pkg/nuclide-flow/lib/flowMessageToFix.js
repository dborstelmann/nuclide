'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import type {Fix} from '../../nuclide-diagnostics-common/lib/rpc-types';
import type {Diagnostic} from '../../nuclide-flow-rpc';

import invariant from 'assert';
import {extractRange} from './flowDiagnosticsCommon';

export default function flowMessageToFix(diagnostic: Diagnostic): ?Fix {
  // Automatically remove unused suppressions:
  if (diagnostic.messageComponents.length === 2 &&
      diagnostic.messageComponents[0].descr === 'Error suppressing comment' &&
      diagnostic.messageComponents[1].descr === 'Unused suppression') {
    const oldRange = extractRange(diagnostic.messageComponents[0]);
    invariant(oldRange != null);
    return {
      newText: '',
      oldRange,
      speculative: true,
    };
  }

  return null;
}
